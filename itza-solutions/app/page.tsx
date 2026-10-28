import { HardHat, Home, Layers, Truck } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site } from "@/lib/site";

const services = [
  {
    title: "Residential Junk Removal",
    description:
      "Garages, attics, estates, and whole-home cleanouts — hauled out clean without damaging your property.",
    icon: Home,
  },
  {
    title: "Driveway-Safe Trailer Drop-Offs",
    description:
      "You load, we haul. Our compact tandem trailer fits tight driveways without cracking or scratching concrete.",
    icon: Truck,
  },
  {
    title: "Contractor & B2B Services",
    description:
      "Reliable job-site haul-aways and contractor drop-offs sized for real schedules — not oversized trucks.",
    icon: HardHat,
  },
  {
    title: "Dense Material Hauling",
    description:
      "Dirt, concrete, tile, and other heavy debris handled with the right equipment and clear fractional pricing.",
    icon: Layers,
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Tell us what you have",
    description:
      "Share photos or a quick description. We’ll confirm fit for our 5.5 cubic yard trailer.",
  },
  {
    step: "02",
    title: "We size the load",
    description:
      "Transparent fractional pricing — ¼, ½, or Full. No mystery fees, no inflated truck minimums.",
  },
  {
    step: "03",
    title: "We haul it away",
    description:
      "Fast, professional, no-hassle service. You get your space back — driveway intact.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate min-h-[calc(100svh-4.25rem)] overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,#0A0A0A_0%,#171717_42%,#1F2A2E_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 top-1/2 h-[120%] w-[58%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,188,212,0.28),transparent_62%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent"
            aria-hidden
          />

          {/* Trailer silhouette as dominant visual plane */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block"
            aria-hidden
          >
            <svg
              viewBox="0 0 640 720"
              className="absolute inset-0 h-full w-full animate-soft-rise opacity-90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="90"
                y="250"
                width="420"
                height="210"
                rx="18"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="2"
              />
              <rect
                x="118"
                y="278"
                width="364"
                height="154"
                rx="8"
                fill="rgba(0,188,212,0.08)"
                stroke="rgba(0,188,212,0.35)"
                strokeWidth="1.5"
              />
              <path
                d="M90 460h420"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />
              <circle
                cx="170"
                cy="500"
                r="42"
                fill="rgba(10,10,10,0.55)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="3"
              />
              <circle
                cx="250"
                cy="500"
                r="42"
                fill="rgba(10,10,10,0.55)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="3"
              />
              <circle cx="170" cy="500" r="16" fill="rgba(233,30,99,0.85)" />
              <circle cx="250" cy="500" r="16" fill="rgba(233,30,99,0.85)" />
              <path
                d="M510 320h48l42 54v86h-90V320Z"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="2"
              />
              <text
                x="140"
                y="220"
                fill="rgba(255,255,255,0.55)"
                fontSize="22"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                fontWeight="700"
                letterSpacing="4"
              >
                60&quot; × 10&apos; × 3&apos; · 5.5 CU YD
              </text>
            </svg>
          </div>

          <div className="relative mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="animate-fade-up max-w-2xl">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.28em] text-white">
                {site.shortName}
              </p>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
                Junk Removal That Doesn’t Scratch Your Driveway.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/72 sm:text-xl">
                Highly maneuverable {site.trailer.dimensions} (
                {site.trailer.capacity}) tandem axle trailer — fits tight
                driveways without cracking concrete. Residential cleanouts and
                contractor drop-offs across {site.serviceAreas}.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaButton href="/quote" className="w-full sm:w-auto">
                  Get a Free Quote
                </CtaButton>
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-md px-4 text-base font-semibold text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                >
                  Call {site.phone}
                </a>
              </div>
              <p className="mt-7 text-sm font-medium tracking-wide text-white/55">
                Driveway-safe · Same-day available · Transparent pricing
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Services built for real driveways.
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">
                From residential cleanouts to contractor drop-offs — same
                careful equipment, same transparent approach.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/20 sm:p-7"
                  >
                    <div className="mb-5 inline-flex size-12 items-center justify-center rounded-lg bg-white text-teal ring-1 ring-border transition-colors group-hover:text-accent">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-[#FAFAFA] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Transparent fractional pricing.
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">
                You only pay for the space you use — ¼, ½, or Full load. No
                padded truck rates. No guesswork.
              </p>
            </div>

            <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
              {steps.map((item) => (
                <li key={item.step} className="relative">
                  <p className="text-sm font-bold tracking-[0.2em] text-accent">
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-dark py-16 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ready to reclaim your space?
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                Fast, professional, no-hassle junk removal across DFW — with a
                trailer that respects your driveway.
              </p>
            </div>
            <CtaButton href="/quote" className="w-full shrink-0 sm:w-auto">
              Get a Free Quote
            </CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
