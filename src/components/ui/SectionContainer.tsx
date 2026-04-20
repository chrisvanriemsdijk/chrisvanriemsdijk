export default function SectionContainer({
  id,
  maxWidth = "max-w-5xl",
  className = "",
  children,
}: {
  id: string;
  maxWidth?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:px-6 md:py-32 ${className}`}>
      <div className={`mx-auto ${maxWidth}`}>{children}</div>
    </section>
  );
}
