# Validating Relationships — Waitlist (Next.js v2)

Premium preorder landing page for Dr. Joshua N. Simeon's new book.  
Built with **Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion + Lenis + GSAP**.

## Run locally

```bash
# from this folder
npm install
npm run dev
```

Open http://localhost:3000

## Drop the book images

Put the two book covers into `public/images/`:
- `cover-front.jpg` — solo "New Book Release" cover with author
- `cover-stack.jpg` — stacked best-seller mockup

If either is missing, a styled placeholder renders so the layout doesn't break.

## Wire the real email capture

1. Get a free Web3Forms key at https://web3forms.com (just enter your email)
2. Copy `.env.example` to `.env.local`
3. Paste the key as `WEB3FORMS_ACCESS_KEY=...`
4. Restart `npm run dev`

Without a key, the form runs in **demo mode** — it logs submissions and shows success so you can preview the UX.

The form posts to `/api/waitlist` (server-side), which forwards to Web3Forms. Your access key never touches the browser.

## Deploy to Vercel

1. Push to GitHub (`git init && gh repo create ...`)
2. Import the repo in Vercel
3. Add `WEB3FORMS_ACCESS_KEY` as an environment variable
4. Deploy. Done.

## What's in the build

| Section | Component | What's special |
|---|---|---|
| Top urgency strip | `Nav` | Live countdown to June 15 2026 |
| Floating nav | `Nav` | Scroll-linked blur + opacity |
| Hero | `Hero` | Letter-by-letter italic reveal, 3D mouse-tilt book, parallax exit |
| Hook | `Hook` | Bishop's intro question with quote card |
| Framework | `Framework` | **Scroll-pinned SVG building constructs itself** (foundation → body → roof → rain reveals leaks) |
| Chapters | `Chapters` | Hover-shift editorial list, 12 entries |
| Showcase | `Showcase` | Stacked-books mockup with scroll parallax, best-seller medal |
| **Level Audit** | `LevelAudit` | **5-question interactive quiz mapping users to Foundation/Body/Roof — drives book relevance** |
| Author | `Author` | Portrait + bio + 4 credits |
| Pull quote | `PullQuote` | Word-by-word scroll-linked opacity reveal ("Stop calling everyone friend") |
| Waitlist form | `WaitlistForm` | Zod-validated, posts to `/api/waitlist`, animated success state, honeypot |
| FAQ | `FAQ` | Smooth height-animated accordion |
| Final CTA | `FinalCTA` | Magnetic button |
| Footer | `Footer` | Minimal, brand + contact |

## Premium polish

- **Custom gold cursor** with magnetic hover on interactive elements
- **Lenis smooth scroll** wrapping everything
- **60-particle gold dust canvas** drifting behind hero
- **Magnetic buttons** that pull toward the cursor
- **Layered backgrounds**: radial gradients + noise + particles + vignette
- **Variable typography**: Cormorant Garamond italic (display) + Playfair Display (headings) + Inter (body)
- **Accessibility**: respects `prefers-reduced-motion`, semantic HTML, keyboard-navigable form

## File map

```
validating-relationships-waitlist/
├── app/
│   ├── layout.tsx              # fonts, metadata, providers, bg layers
│   ├── page.tsx                # composition of all sections
│   ├── globals.css             # tokens, utility classes
│   └── api/waitlist/route.ts   # form submission handler
├── components/
│   ├── lenis-provider.tsx
│   ├── cursor.tsx
│   ├── particles.tsx
│   ├── countdown.tsx
│   ├── nav.tsx
│   ├── hero.tsx
│   ├── hook.tsx
│   ├── framework.tsx           # the scroll-pinned building
│   ├── chapters.tsx
│   ├── showcase.tsx
│   ├── level-audit.tsx         # interactive quiz
│   ├── author.tsx
│   ├── pull-quote.tsx
│   ├── waitlist-form.tsx
│   ├── faq.tsx
│   ├── final-cta.tsx
│   ├── footer.tsx
│   └── ui/
│       └── button.tsx          # magnetic molten button
├── lib/
│   ├── utils.ts                # cn(), countdown formatter
│   └── motion.ts               # reusable Framer variants
├── public/images/              # drop covers here
├── tailwind.config.ts
├── next.config.js
├── package.json
└── .env.example
```

## Out of scope (deliberately)

- Payment processing
- User accounts
- Multi-page routing
- Blog / search
- Analytics dashboard

Add Plausible or GA snippet to `app/layout.tsx` when needed.
