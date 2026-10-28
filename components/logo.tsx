import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** Use color mark on dark backgrounds; black mark on light ones. */
  variant?: "black" | "color";
};

export function Logo({
  className = "",
  priority = false,
  variant = "black",
}: LogoProps) {
  const src =
    variant === "color"
      ? "/logo-color.png"
      : "/logo-black.png";

  return (
    <Link
      href="/"
      className={`inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm ${className}`}
      aria-label="ITZA Solutions LLC home"
    >
      <Image
        src={src}
        alt="ITZA Solutions LLC"
        width={185}
        height={96}
        priority={priority}
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
