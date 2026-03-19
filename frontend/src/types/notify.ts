export type NotificationMessage = string | null;

export type NotificationType = 'success' | 'error' | null;

export interface Notification {
  message: NotificationMessage;
  type: NotificationType;
}