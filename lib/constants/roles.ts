export const ROLES = {
  MEMBER: "member",
  MODERATOR: "moderator",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
