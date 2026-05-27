export default function Footer() {
  return (
    <footer className="relative border-t border-covenant-gold/15 bg-black/30 mt-8 sm:mt-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-6 sm:gap-8">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 40 40" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" aria-hidden>
              <defs>
                <linearGradient id="g-footer" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#F4C542" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" fill="none" stroke="url(#g-footer)" strokeWidth="1.5" />
              <path
                d="M14 27 L14 13 L20 22 L26 13 L26 27"
                fill="none"
                stroke="url(#g-footer)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col leading-tight">
              <strong className="font-heading font-bold text-[14px] sm:text-[15px] text-parchment">
                Command of Faith Ministries Worldwide
              </strong>
              <span className="text-[11px] sm:text-[12px] tracking-[0.1em] text-parchment-mute">
                Cape Town, South Africa
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-[13px] sm:text-right">
            <a href="mailto:info@commandoffaith.org" className="text-covenant-gold hover:text-covenant-bright">
              info@commandoffaith.org
            </a>
            <a href="tel:+27836703727" className="text-covenant-gold hover:text-covenant-bright">
              +27 83 670 3727
            </a>
          </div>
        </div>

        <p className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-covenant-gold/[0.08] text-center text-[11px] sm:text-[12px] tracking-[0.05em] text-parchment-mute pb-[max(0px,env(safe-area-inset-bottom))]">
          © 2026 Command of Faith Ministries Worldwide. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
