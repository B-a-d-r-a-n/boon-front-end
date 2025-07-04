import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <div className="flex flex-col items-center gap-4">
        <FileQuestion
          className="h-16 w-16 text-muted-foreground"
          strokeWidth={1}
        />
        <h1 className="text-4xl font-bold tracking-tight">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Oops! The page you are looking for doesn&apos;t exist. It might have
          been moved, deleted, or you may have typed the address incorrectly.
        </p>
        <div className="mt-4 flex gap-4">
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}