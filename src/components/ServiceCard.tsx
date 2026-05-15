interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
}

export function ServiceCard({ title, description, price }: ServiceCardProps) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-copper/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {price ? <span className="text-copper-300 font-semibold">{price}</span> : null}
      </div>
      <p className="text-sm leading-7 text-slate-300">{description}</p>
    </article>
  );
}
