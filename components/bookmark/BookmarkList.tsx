"use client";

import BookmarkCard from "./BookmarkCard";
import BookmarkSkeleton from "./BookmarkSkeleton";
import BookmarkEmptyState from "./BookmarkEmptyState";
import type { Bookmark } from "@/types/bookmark";

interface BookmarkListProps {
  bookmarks: Bookmark[] | undefined;
  isLoading: boolean;
}

export default function BookmarkList({ bookmarks, isLoading }: BookmarkListProps) {
  if (isLoading) {
    return <BookmarkSkeleton />;
  }

  if (!bookmarks || bookmarks.length === 0) {
    return <BookmarkEmptyState />;
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
