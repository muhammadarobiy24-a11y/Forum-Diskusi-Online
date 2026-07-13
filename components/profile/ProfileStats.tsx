"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Heart, Bookmark } from "lucide-react";
import type { Profile } from "@/types";

interface ProfileStatsProps {
  userId: string;
}

export default function ProfileStats({ userId }: ProfileStatsProps) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-1">
                <Skeleton className="h-6 w-12 mx-auto" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">0</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Heart className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">0</p>
            <p className="text-sm text-muted-foreground">Likes</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Bookmark className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">0</p>
            <p className="text-sm text-muted-foreground">Bookmarks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
