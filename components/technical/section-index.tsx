export function SectionIndex({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-index">
      <span>{number}</span>
      <span aria-hidden="true">/</span>
      <span>{children}</span>
    </div>
  );
}
