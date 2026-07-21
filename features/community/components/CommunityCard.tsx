"use client";

import Link from "next/link";
import { Users, FileText, ShieldCheck } from "lucide-react";
import type { Community } from "../types/community";

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({
  community,
}: CommunityCardProps) {
  return (
    <Link href={`/communities/${community.slug}`}>
      <div className="rounded-xl border bg-background p-5 hover:bg-accent transition cursor-pointer">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
            r
          </div>

          <div className="flex-1">

            <div className="flex items-center gap-2">

              <h2 className="font-semibold text-lg">
                r/{community.slug}
              </h2>

              {community.is_verified && (
                <ShieldCheck
                  className="h-4 w-4 text-blue-500"
                />
              )}

            </div>

            <p className="text-sm text-muted-foreground">
              {community.description || "Tidak ada deskripsi."}
            </p>

          </div>

        </div>

        <div className="mt-5 flex gap-6 text-sm text-muted-foreground">

          <div className="flex items-center gap-2">
            <Users size={16} />
            {community.member_count} Members
          </div>

          <div className="flex items-center gap-2">
            <FileText size={16} />
            {community.post_count} Posts
          </div>

        </div>

      </div>
    </Link>
  );
}