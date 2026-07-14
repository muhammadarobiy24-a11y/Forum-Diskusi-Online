"use client";

import { useSession } from "@/components/providers/SessionProvider";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";

export default function ProfilePage() {
  const { user } = useSession();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Silakan login untuk melihat profil Anda.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profil</h1>
        <p className="text-muted-foreground mt-1">
          Informasi akun Anda.
        </p>
      </div>
      <ProfileCard userId={user.id} />
      <ProfileStats userId={user.id} />
    </div>
  );
}
