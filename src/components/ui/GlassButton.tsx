import type { ReactNode, MouseEvent } from "react";

export default function GlassButton({
  icon,
  label,
  href,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const className =
    "glass inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:text-[var(--accent)]";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {icon}
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${className} cursor-pointer`}>
      {icon}
      {label}
    </button>
  );
}
