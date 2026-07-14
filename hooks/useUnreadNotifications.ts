import { useQuery } from "@tanstack/react-query";
import { fetchUnreadCount } from "@/services/notification.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useUnreadNotifications(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.unreadNotifications(userId || ""),
    queryFn: () => fetchUnreadCount(userId!),
    enabled: !!userId,
  });
}
