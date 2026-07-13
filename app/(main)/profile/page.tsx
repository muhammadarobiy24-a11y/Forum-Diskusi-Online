"use client";

import { useSession } from "@/components/providers/SessionProvider";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";

export default function ProfilePage() {
  const { user } = useSession();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <ProfileCard userId={user.id} />
      <ProfileStats userId={user.id} />
    </div>
  );
}
