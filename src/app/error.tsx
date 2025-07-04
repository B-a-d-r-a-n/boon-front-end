"use client"; 
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">
            Something Went Wrong
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We encountered an unexpected error. Please try again, or return to
            the homepage if the issue persists.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4">
            <Button
              onClick={
                () => reset()
              }
            >
              Try again
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}