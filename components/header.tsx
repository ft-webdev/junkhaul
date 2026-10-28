"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[#FAFAFA]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Logo priority />

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-12 items-center gap-2 rounded-md px-3 text-sm font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Phone className="size-4 text-teal" aria-hidden />
            {site.phone}
          </a>
          <Link
            href="/quote"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-foreground/15 bg-white px-5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-md border border-border bg-white text-foreground sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-white px-4 py-4 sm:hidden"
        >
          <div className="flex flex-col gap-2">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-md px-3 text-base font-semibold"
              onClick={() => setOpen(false)}
            >
              <Phone className="size-4 text-teal" aria-hidden />
              {site.phone}
            </a>
            <Link
              href="/quote"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-5 text-base font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
