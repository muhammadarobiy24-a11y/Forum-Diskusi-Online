import { createClient } from "@/lib/supabase/client";
import type { Notification, GetNotificationsParams, GetNotificationsResponse } from "@/types/notification";

const DEFAULT_LIMIT = 20;

export async function getNotifications({
  userId,
  page = 1,
  limit = DEFAULT_LIMIT,
}: GetNotificationsParams): Promise<GetNotificationsResponse> {
  const supabase = createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("notifications")
    .select(
      `
      *,
      actor:profiles!notifications_actor_id_fkey(
        id,
        username,
        avatar_url
      )
    `,
      { count: "exact" }
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  const totalCount = count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const startItem = totalCount > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, totalCount);

  return {
    notifications: (data as Notification[]) || [],
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages,
      startItem,
      endItem,
    },
  };
}

export async function getUnreadCount(userId: string): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) throw error;

  return count || 0;
}

export async function markAsRead(notificationId: string): Promise<void> {
  const supabase = createClient();

  const { error, count } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId);

  if (error) throw error;

  if (count === 0) {
    throw new Error("Notifikasi tidak ditemukan.");
  }
}

export async function markAllAsRead(userId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) throw error;
}
