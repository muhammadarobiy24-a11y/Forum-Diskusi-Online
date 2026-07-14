import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from "@/repositories/notification.repository";
import type { GetNotificationsParams, GetNotificationsResponse } from "@/types/notification";

export async function fetchNotifications(params: GetNotificationsParams): Promise<GetNotificationsResponse> {
  return getNotifications(params);
}

export async function fetchUnreadCount(userId: string): Promise<number> {
  return getUnreadCount(userId);
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  return markAsRead(notificationId);
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  return markAllAsRead(userId);
}
