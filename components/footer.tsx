import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {site.name}. All rights reserved.
        </p>
        <div className="flex flex-col gap-1 sm:items-end">
          <p>
            <a
              href={site.phoneHref}
              className="font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {site.phone}
            </a>
            <span className="mx-2 text-border">·</span>
            <a
              href={site.emailHref}
              className="font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {site.email}
            </a>
          </p>
          <p>Serving {site.serviceAreas}</p>
        </div>
      </div>
    </footer>
  );
}
