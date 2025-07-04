"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination as PaginationType } from "@/types/product";
interface PaginationControlsProps {
  pagination: PaginationType;
}
export function PaginationControls({ pagination }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (pagination.totalPages <= 1) {
    return null;
  }
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      <Button
        variant="outline"
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={!pagination.hasPrevPage}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <span className="text-sm font-medium">
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={!pagination.hasNextPage}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}