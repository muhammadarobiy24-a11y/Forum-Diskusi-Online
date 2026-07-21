import { notFound } from "next/navigation";
import { Users, FileText, ShieldCheck, Lock, EyeOff } from "lucide-react";

import { getCommunity } from "@/features/community/services/community.service";
import JoinButton from "@/features/community/components/JoinButton";

interface CommunityDetailPageProps {
  params: Promise<{ slug: string }>;
}

function VisibilityBadge({
  visibility,
}: {
  visibility: "public" | "restricted" | "private";
}) {
  if (visibility === "public") return null;

  if (visibility === "restricted") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
        <Lock className="h-3 w-3" />
        Restricted
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
      <EyeOff className="h-3 w-3" />
      Private
    </span>
  );
}

export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const { slug } = await params;

  const community = await getCommunity(slug);

  if (!community) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl">

      {/* Banner */}
      <div className="h-32 w-full rounded-xl bg-gradient-to-r from-primary/30 to-primary/10 mb-0 overflow-hidden">
        {community.banner_url && (
          <img
            src={community.banner_url}
            alt={`${community.name} banner`}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Header */}
      <div className="rounded-b-xl border border-t-0 bg-background px-6 pb-5">
        <div className="flex items-end justify-between gap-4 -mt-6">

          {/* Icon */}
          <div className="h-16 w-16 rounded-full border-4 border-background bg-muted flex items-center justify-center text-2xl font-bold flex-shrink-0">
            {community.icon_url ? (
              <img
                src={community.icon_url}
                alt={community.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              "r"
            )}
          </div>

          {/* Join Button */}
          <div className="pb-1">
            <JoinButton communityId={community.id} />
          </div>

        </div>

        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold">r/{community.slug}</h1>
            {community.is_verified && (
              <ShieldCheck className="h-5 w-5 text-blue-500" />
            )}
            <VisibilityBadge visibility={community.visibility} />
          </div>

          <p className="text-sm font-medium text-muted-foreground">
            {community.name}
          </p>

          {community.description && (
            <p className="text-sm text-foreground/80 pt-1">
              {community.description}
            </p>
          )}

          <div className="flex gap-6 pt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {community.member_count.toLocaleString("id-ID")}
              </span>
              <span>Members</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {community.post_count.toLocaleString("id-ID")}
              </span>
              <span>Posts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Posts Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border bg-background p-5">
            <p className="text-sm text-muted-foreground text-center py-8">
              Belum ada post di community ini.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-background p-5">
            <h2 className="font-semibold mb-3">Tentang Community</h2>
            <p className="text-sm text-muted-foreground">
              {community.description || "Tidak ada deskripsi."}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Members</span>
                <span className="font-medium">
                  {community.member_count.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Posts</span>
                <span className="font-medium">
                  {community.post_count.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipe</span>
                <span className="font-medium capitalize">
                  {community.visibility}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
