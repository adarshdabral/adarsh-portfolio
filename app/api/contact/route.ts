interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Name, email, and message are all required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // No email provider configured yet — log server-side and still report
    // success so the demo experience never breaks. Wire up RESEND_API_KEY
    // and CONTACT_TO_EMAIL in .env.local to send real emails.
    console.info("[contact] message received (no RESEND_API_KEY configured):", {
      name,
      email,
      message,
    });
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AshOS Contact Form <onboarding@resend.dev>",
        to,
        reply_to: email,
        subject: `New message from ${name} via AshOS`,
        text: `${message}\n\n— ${name} (${email})`,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend responded with ${res.status}`);
    }

    return Response.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] failed to send via Resend:", error);
    return Response.json(
      { ok: false, error: "Couldn't send that right now — try again in a bit." },
      { status: 502 }
    );
  }
}
