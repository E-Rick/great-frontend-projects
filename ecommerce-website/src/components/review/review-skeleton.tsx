import { Skeleton } from "@/components/ui/skeleton";

export function ReviewSkeleton() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto px-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="details flex flex-auto flex-col items-start gap-1">
              <div className="title flex w-full items-center justify-between">
                <Skeleton className="inline h-6 w-[50%]" />
                <Skeleton className="inline h-6 w-[110px]" />
              </div>
              <Skeleton className="h-5 w-[116px]" />
            </div>
          </div>

          <Skeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  );
}
