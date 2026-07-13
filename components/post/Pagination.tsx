"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { getPaginationRange } from "@/lib/utils/pagination";
import type { PaginationMeta } from "@/types/post";

interface PaginationProps {
  pagination: PaginationMeta;
  baseUrl: string;
  searchParams?: Record<string, string>;
}

export default function Pagination({
  pagination,
  baseUrl,
  searchParams = {},
}: PaginationProps) {
  const { page, totalPages, total, startItem, endItem } = pagination;

  if (totalPages <= 1) return null;

  const { range, hasLeftEllipsis, hasRightEllipsis } = getPaginationRange(
    page,
    totalPages
  );

  function buildUrl(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${baseUrl}?${params.toString()}`;
  }

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-muted-foreground">
        Menampilkan {startItem}-{endItem} dari {total} postingan
      </div>

      <nav className="flex items-center justify-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
        >
          <Link href={buildUrl(page - 1)} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        </Button>

        {hasLeftEllipsis && (
          <>
            <Button variant="outline" size="icon">
              <Link href={buildUrl(1)}>1</Link>
            </Button>
            <span className="flex items-center justify-center w-8 h-8">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </span>
          </>
        )}

        {range.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? "default" : "outline"}
            size="icon"
          >
            <Link href={buildUrl(pageNumber)}>{pageNumber}</Link>
          </Button>
        ))}

        {hasRightEllipsis && (
          <>
            <span className="flex items-center justify-center w-8 h-8">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </span>
            <Button variant="outline" size="icon">
              <Link href={buildUrl(totalPages)}>{totalPages}</Link>
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
        >
          <Link href={buildUrl(page + 1)} className="flex items-center gap-1">
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </nav>
    </div>
  );
}
