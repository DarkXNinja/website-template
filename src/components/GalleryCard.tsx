interface GalleryCardProps {
  src: string;
  alt: string;
}

export function GalleryCard({ src, alt }: GalleryCardProps) {
  return (
    <div className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-soft transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <img src={src} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
    </div>
  );
}
