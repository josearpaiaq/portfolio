import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import ContactEmail from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
  fullname: z.string().min(2).max(100),
  email: z.string().email().max(254),
  how_did_you_hear: z.string().max(200).optional().default(''),
  message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { fullname, email, how_did_you_hear, message } = parsed.data;

  const html = await render(
    ContactEmail({ fullname, email, how_did_you_hear, message }),
  );

  const { data, error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL_TO!,
    subject: `New message from ${fullname}`,
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data?.id }, { status: 200 });
}
