interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl text-center mx-auto mb-10">
      <p className="text-copper-300 uppercase tracking-[0.3em] text-sm font-semibold">{eyebrow}</p>
      <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white">{title}</h2>
      <p className="mt-4 text-slate-300 leading-8">{description}</p>
    </div>
  );
}
