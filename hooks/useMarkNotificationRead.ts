import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { markNotificationAsRead, markAllNotificationsAsRead } from "@/services/notification.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useMarkNotificationRead(userId: string | undefined) {
  const queryClient = useQueryClient();

  const markOne = useMutation({
    mutationFn: (notificationId: string) => markNotificationAsRead(notificationId),
    onMutate: async () => {
      if (!userId) return {};

      await queryClient.cancelQueries({ queryKey: queryKeys.notifications(userId) });
      await queryClient.cancelQueries({ queryKey: queryKeys.unreadNotifications(userId) });

      return {};
    },
    onSettled: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.notifications(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.unreadNotifications(userId) });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menandai notifikasi.");
    },
  });

  const markAll = useMutation({
    mutationFn: () => {
      if (!userId) throw new Error("Anda harus login.");
      return markAllNotificationsAsRead(userId);
    },
    onMutate: async () => {
      if (!userId) return {};

      await queryClient.cancelQueries({ queryKey: queryKeys.notifications(userId) });
      await queryClient.cancelQueries({ queryKey: queryKeys.unreadNotifications(userId) });

      return {};
    },
    onSettled: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.notifications(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.unreadNotifications(userId) });
      }
    },
    onSuccess: () => {
      toast.success("Semua notifikasi ditandai sudah dibaca.");
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menandai semua notifikasi.");
    },
  });

  return { markOne, markAll };
}
