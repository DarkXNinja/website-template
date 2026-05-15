interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
}

export function ReviewCard({ name, rating, text }: ReviewCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft transition duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: rating }).map((_, index) => (
          <span key={index} className="text-copper-300 text-base">★</span>
        ))}
      </div>
      <p className="text-slate-200 leading-7 mb-5">“{text}”</p>
      <p className="font-semibold">{name}</p>
    </div>
  );
}
