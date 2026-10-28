import Link from "next/link";
import type { ComponentProps } from "react";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark-outline";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]",
  secondary:
    "bg-white text-foreground border border-foreground/15 hover:border-foreground/30",
  "dark-outline":
    "bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/5",
} as const;

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-md px-7 text-base font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
