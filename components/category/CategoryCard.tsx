"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="transition-colors hover:bg-muted/50 cursor-pointer h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{category.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {category.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{category.post_count ?? 0} posts</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
