type HomeOrderTypeDineInIconProps = {
  className?: string;
};

export function HomeOrderTypeDineInIcon({
  className,
}: HomeOrderTypeDineInIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 11v2a2 2 0 0 0 2 2h1" />
      <path d="M7 11V7a2 2 0 0 1 2-2h1" />
      <path d="M10 11V5" />
      <path d="M14 11V5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v6" />
      <path d="M19 11v2a2 2 0 0 1-2 2h-1" />
      <path d="M5 19v2" />
      <path d="M19 19v2" />
    </svg>
  );
}
