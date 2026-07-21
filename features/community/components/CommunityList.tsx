"use client";

import { useCommunities } from "../hooks/useCommunities";
import CommunityCard from "./CommunityCard";

export default function CommunityList() {
  const { data, isLoading, error } = useCommunities();

  if (isLoading) {
    return (
      <p>Loading communities...</p>
    );
  }

  if (error) {
    return (
      <p>Gagal mengambil data community.</p>
    );
  }

  if (!data?.length) {
    return (
      <p>Belum ada community.</p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
        />
      ))}
    </div>
  );
}