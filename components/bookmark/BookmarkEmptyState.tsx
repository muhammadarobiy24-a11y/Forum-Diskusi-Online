"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookmarkEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Belum ada bookmark</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        Simpan postingan menarik untuk dibaca nanti.
      </p>
      <Button>
        <Link href="/post">Browse Postingan</Link>
      </Button>
    </div>
  );
}
