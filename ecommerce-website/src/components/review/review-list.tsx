import { formatDate, getInitials } from "@/components/review/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";
import { DataEntity } from "@/lib/product-review-types";

export function ReviewList({ data }: { data: DataEntity[] }) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {data.map((review) => {
        const user = review.user;
        return (
          <div key={user.user_id} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12">
                {user.avatar_url && (
                  <AvatarImage src={user.avatar_url} className="object-cover" />
                )}
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="details flex flex-auto flex-col items-start gap-1">
                <div className="title flex w-full items-center justify-between">
                  <span className="text-base font-semibold text-primary">
                    {user.name}
                  </span>
                  <span className="text-xs font-normal text-neutral-600">
                    {formatDate(review.created_at)}
                  </span>
                </div>
                <StarRating rating={review.rating} />
              </div>
            </div>

            <p className="text-base font-normal text-neutral-600">
              {review.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
