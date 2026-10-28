import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "", priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm ${className}`}
      aria-label="ITZA Solutions LLC home"
    >
      <Image
        src="/Itza-Solutions-black-logo.png"
        alt="ITZA Solutions LLC"
        width={220}
        height={48}
        priority={priority}
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
