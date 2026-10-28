import Image from "next/image";
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
        {/* Hero — full-bleed photo */}
        <section className="relative isolate min-h-[calc(100svh-4.25rem)] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/hero-junk-removal.jpg"
              alt="ITZA Solutions tandem trailer loaded with residential junk on a clean driveway"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[68%_center] animate-hero-zoom sm:object-center"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(105deg,rgba(10,10,10,0.88)_0%,rgba(10,10,10,0.72)_38%,rgba(10,10,10,0.35)_62%,rgba(10,10,10,0.22)_100%)]"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
              aria-hidden
            />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:justify-center sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
            <div className="animate-fade-up max-w-2xl">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.28em] text-white">
                {site.shortName}
              </p>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
                Junk Removal That Doesn’t Scratch Your Driveway.
              </h1>
              <p
                className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl animate-fade-up"
                style={{ animationDelay: "120ms" }}
              >
                Highly maneuverable {site.trailer.dimensions} (
                {site.trailer.capacity}) tandem axle trailer — fits tight
                driveways without cracking concrete. Residential cleanouts and
                contractor drop-offs across {site.serviceAreas}.
              </p>
              <div
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up"
                style={{ animationDelay: "220ms" }}
              >
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
              <p
                className="mt-7 text-sm font-medium tracking-wide text-white/60 animate-fade-up"
                style={{ animationDelay: "320ms" }}
              >
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
                    className="service-card group rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/20 sm:p-7"
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
