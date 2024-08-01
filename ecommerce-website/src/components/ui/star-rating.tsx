import { TbStar, TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

const MAX_STARS = 5;

export function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = MAX_STARS - Math.ceil(rating);
  return (
    <div className="inline-flex justify-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <TbStarFilled key={i} size={20} className="text-yellow-400" />
      ))}
      {hasHalfStar && (
        <TbStarHalfFilled size={20} className="text-yellow-400" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <TbStar key={i} size={20} className="text-yellow-400" />
      ))}
    </div>
  );
}
