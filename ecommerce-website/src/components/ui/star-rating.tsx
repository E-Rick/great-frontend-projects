import { cn } from "@/lib/utils";

const MAX_STARS = 5;

export function StarRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const fullStars = Math.floor(rating);
  const partialStarPercentage = Math.round((rating % 1) * 100);
  const hasPartialStar = rating % 1 !== 0;
  const emptyStars = MAX_STARS - Math.ceil(rating);
  return (
    <div className={cn("inline-flex justify-center gap-1", className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarIcon key={i} fillPercentage={100} />
      ))}
      {hasPartialStar && <StarIcon fillPercentage={partialStarPercentage} />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <StarIcon key={i + fullStars} fillPercentage={0} />
      ))}
    </div>
  );
}

/**
 * Fillable Star Icon based on fill percentage.
 * Note: The ids for the `linearGradient` need to be unique since for each fill percentage.
 * @param fillPercentage {number} - value between 0 and 100
 * @returns star icon filled by the amount of `fillPercentage`
 */
function StarIcon({ fillPercentage }: { fillPercentage: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path
        fill={`url(#yellow-gradient-${fillPercentage})`}
        d="M9.538 1.61a.5.5 0 01.924 0l2.066 4.967a.5.5 0 00.421.307l5.363.43a.5.5 0 01.286.878l-4.086 3.5a.5.5 0 00-.161.496l1.248 5.233a.5.5 0 01-.747.543l-4.591-2.805a.5.5 0 00-.522 0l-4.59 2.804a.5.5 0 01-.748-.542l1.248-5.233a.5.5 0 00-.16-.496l-4.087-3.5a.5.5 0 01.286-.878l5.363-.43a.5.5 0 00.421-.307L9.538 1.61z"
      />

      <defs>
        <linearGradient
          id={`yellow-gradient-${fillPercentage}`}
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop offset={`${fillPercentage}%`} stopColor="#FACC15" />
          <stop offset={`${fillPercentage}%`} stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
