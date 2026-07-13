"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PostEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Belum ada postingan</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        Jadilah yang pertama membagikan ide Anda.
      </p>
      <Button>
        <Link href="/post/create">Buat Postingan</Link>
      </Button>
    </div>
  );
}
