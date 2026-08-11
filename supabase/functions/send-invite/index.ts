// Supabase Edge Function: send-invite
// Emails a collaborator an invitation with a link to the workspace.
// Secrets required (set in Supabase → Edge Functions → Secrets):
//   BREVO_API_KEY  - your Brevo API key
//   SENDER_EMAIL   - the email address you verified as a sender in Brevo
// Called by the app (authenticated) via supabase.functions.invoke('send-invite', { body: {...} }).

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function esc(s = "") {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

function json(obj: unknown, status: number) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const { to, eventName, inviter, appUrl } = await req.json();
    if (!to) return json({ error: "missing recipient" }, 400);

    const key = Deno.env.get("BREVO_API_KEY");
    const sender = Deno.env.get("SENDER_EMAIL");
    if (!key || !sender) return json({ error: "email not configured" }, 500);

    const link = appUrl || "https://sarahvbundy-hue.github.io/hospitality-app/";
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#28302b">
        <h2 style="color:#2d4a41;font-weight:normal">You've been invited to an event</h2>
        <p>${inviter ? esc(inviter) + " invited you" : "You have been invited"} to collaborate on
          <b>${esc(eventName || "an event")}</b> in the Hospitality Playbook workspace.</p>
        <p style="margin:26px 0">
          <a href="${esc(link)}" style="background:#c79a3e;color:#2d4a41;padding:12px 22px;border-radius:4px;text-decoration:none;font-weight:bold">Open the workspace</a>
        </p>
        <p style="color:#666;font-size:14px">Sign in with <b>${esc(to)}</b> and this event will be waiting for you.</p>
      </div>`;

    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "accept": "application/json", "content-type": "application/json" },
      body: JSON.stringify({
        sender: { email: sender, name: "Hospitality Playbook" },
        to: [{ email: to }],
        subject: `You're invited: ${eventName || "an event"}`,
        htmlContent: html,
      }),
    });

    const data = await r.json().catch(() => ({}));
    return json({ ok: r.ok, data }, r.ok ? 200 : 502);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
