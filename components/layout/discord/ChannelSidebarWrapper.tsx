"use client";

import { usePathname } from "next/navigation";
import ChannelSidebar from "./ChannelSidebar";

export default function ChannelSidebarWrapper() {
  const pathname = usePathname();

  // Match /communities/[slug] — any depth
  const match = pathname.match(/^\/communities\/([^/]+)/);
  const communitySlug = match?.[1];

  // Don't show community sidebar on /communities (list) or /communities/create
  const isListPage = pathname === "/communities";
  const isCreatePage = pathname === "/communities/create";

  const slug =
    communitySlug && !isListPage && !isCreatePage
      ? communitySlug
      : undefined;

  return <ChannelSidebar communitySlug={slug} />;
}
