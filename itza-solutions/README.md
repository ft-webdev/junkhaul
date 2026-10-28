# ITZA Solutions LLC

Production-ready 2-page marketing site for **ITZA Solutions LLC** — driveway-safe junk removal and hauling across Dallas, Collin County, and Rockwall.

Built with Next.js App Router, Tailwind CSS, Lucide icons, and Resend for lead email delivery.

## Pages

- `/` — Landing page (services, how it works, CTAs)
- `/quote` — Distraction-free quote form with server-side email delivery

## Local development

```bash
cd itza-solutions
cp .env.example .env.local
npm install
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) |
| `LEAD_TO_EMAIL` | Yes | Where new quote notifications are sent |
| `RESEND_FROM_EMAIL` | No | Verified sender address. Defaults to `onboarding@resend.dev` for testing |

### Configuring Resend on Vercel

1. Create a Resend account and API key.
2. Verify your sending domain (or use `onboarding@resend.dev` while testing).
3. In the Vercel project → **Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `LEAD_TO_EMAIL`
   - `RESEND_FROM_EMAIL` (optional, recommended for production)
4. Redeploy so the new variables are available to Server Actions.

Without these variables, the quote form still validates and shows a graceful error instead of crashing.

## Deploy on Vercel

1. Push this repo to Git.
2. Import the project in Vercel (framework preset: Next.js).
3. Set **Root Directory** to `itza-solutions` if the app lives in that subdirectory.
4. Add the environment variables above.
5. Deploy.

## Notes

- Quote submissions use a Server Action (`app/quote/actions.ts`) with Zod validation, honeypot spam protection, HTML lead emails, and an optional customer confirmation email.
- Update phone/email in `lib/site.ts` before going live.
- Logo asset: `public/Itza-Solutions-black-logo.png`
