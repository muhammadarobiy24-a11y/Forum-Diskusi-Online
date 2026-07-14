import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "@/services/notification.service";
import { queryKeys } from "@/lib/constants/query-keys";

interface UseNotificationsParams {
  userId: string;
  page?: number;
  limit?: number;
}

export function useNotifications({ userId, page = 1, limit = 20 }: UseNotificationsParams) {
  return useQuery({
    queryKey: queryKeys.notifications(userId),
    queryFn: () => fetchNotifications({ userId, page, limit }),
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });
}
