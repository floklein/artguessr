import { Skeleton } from "./ui/skeleton";

export function LoadingPage() {
  return (
    <main className="flex-1 flex flex-col gap-4 sm:gap-8 p-4 sm:p-8 items-center overflow-hidden">
      <Skeleton className="flex-1 overflow-hidden w-full" />
      <Skeleton className="w-full max-w-xl h-[195px]" />
    </main>
  );
}
