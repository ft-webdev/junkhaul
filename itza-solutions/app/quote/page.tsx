import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { QuoteForm } from "@/components/quote-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Get a free junk removal quote from ITZA Solutions LLC. Driveway-safe hauling across Dallas, Collin County, and Rockwall.",
};

export default function QuotePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[radial-gradient(ellipse_at_top,rgba(0,188,212,0.08),transparent_50%),linear-gradient(180deg,#FAFAFA_0%,#FFFFFF_55%)]">
      <header className="border-b border-border/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
          <Logo priority />
          <p className="text-sm font-semibold tracking-tight text-muted">
            Request a Quote
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 max-w-xl">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Tell us what needs to go.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            Share a few details and we’ll size the load — ¼, ½, or Full — with
            transparent fractional pricing. Serving {site.serviceAreas}.
          </p>
        </div>

        <QuoteForm />

        <p className="mt-8 text-center text-sm text-muted">
          Prefer to talk?{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Call {site.phone}
          </a>
        </p>
      </main>
    </div>
  );
}
