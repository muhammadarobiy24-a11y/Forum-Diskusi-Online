import Link from "next/link";
import { Plus } from "lucide-react";

import CommunityList from "@/features/community/components/CommunityList";

export default function CommunitiesPage() {
  return (
    <div className="mx-auto max-w-6xl">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Communities
          </h1>

          <p className="text-muted-foreground">
            Temukan komunitas sesuai minatmu.
          </p>

        </div>

        <Link
          href="/communities/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
        >
          <Plus size={18} />
          Create Community
        </Link>

      </div>

      <CommunityList />

    </div>
  );
}