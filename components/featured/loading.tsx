import { Skeleton } from "../ui/skeleton";

export default function Loading() {
  return Array.from({ length: 18 }).map((_, index) => (
    <div key={index} className="w-full space-y-2">
      <Skeleton className="aspect-video w-full rounded-md" />
      <div className="space-y-1.5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  ));
}