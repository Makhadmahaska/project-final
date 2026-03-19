import { useState } from "react";
import type {
  NotificationMessage,
  NotificationType,
} from "../types/notify";

export default function useNotifications() {
  const [notificationMessage, setNotificationMessage] =
    useState<NotificationMessage>(null);

  const [notificationType, setNotificationType] =
    useState<NotificationType>(null);

  const showNotification = (
    message: NotificationMessage,
    type: NotificationType,
    duration: number = 4 * 1000
  ) => {
    setNotificationMessage(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, duration);
  };

  return {
    notificationMessage,
    notificationType,
    showNotification,
  };
}