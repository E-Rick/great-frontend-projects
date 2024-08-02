import { Skeleton } from "@/components/ui/skeleton";

export function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="details flex flex-auto flex-col items-start gap-1">
          <div className="title flex w-full items-center justify-between">
            <Skeleton className="inline h-6 w-full" />
          </div>
          <Skeleton className="h-5 w-[116px]" />
        </div>
      </div>

      <Skeleton className="h-4 w-full" />
    </div>
  );
}
