import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      {}
      <header className="mb-8">
        <Skeleton className="h-10 w-1/2 md:w-1/3" />
        <Skeleton className="h-5 w-2/3 md:w-1/2 mt-3" />
      </header>
      {}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </aside>
        {}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}