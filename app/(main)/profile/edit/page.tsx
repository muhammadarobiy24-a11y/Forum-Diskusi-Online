"use client";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "@/components/providers/SessionProvider";
import AvatarUpload from "@/components/profile/AvatarUpload";
import EditProfileForm from "@/components/profile/EditProfileForm";
import type { Profile } from "@/types";

export default function EditProfilePage() {
  const { user } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Please log in to edit your profile.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-center gap-4">
        <AvatarUpload
          userId={user.id}
          currentAvatarUrl={profile.avatar_url}
          username={profile.username}
          onAvatarUpdate={(url) => {
            queryClient.setQueryData(["profile", user.id], {
              ...profile,
              avatar_url: url,
            });
          }}
        />
      </div>

      <EditProfileForm
        profile={profile}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
          router.push("/profile");
        }}
      />
    </div>
  );
}
