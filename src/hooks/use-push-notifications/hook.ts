import React from "react";
import { io } from "socket.io-client";

export interface PushNotificationsHook {
  isConnected: boolean;
  notifications: PushNotification[];
  consumeNotification: () => PushNotification | undefined;
}

export interface PushNotification {
  message: string;
  severity: "info" | "warning" | "error" | "success";
}

export function usePushNotifications(): PushNotificationsHook {
  const [isConnected, setIsConnected] = React.useState(false);
  const [notifications, setNotifications] = React.useState<PushNotification[]>(
    []
  );

  const socket = io(
    process.env.REACT_APP_NOTIFICATIONS_URI ?? "ws://127.0.0.1:3002",
    {
      path: "/ws/",
    }
  );

  function addIncomingNotification(notification: PushNotification): void {
    setNotifications((lastNotifications) => [
      ...lastNotifications,
      notification,
    ]);
  }

  function consumeNotification(): PushNotification | undefined {
    return notifications.shift();
  }

  React.useEffect(() => {
    const onConnect = (): void => {
      setIsConnected(true);
    };
    const onDisconnect = (): void => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("notifications", addIncomingNotification);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("notifications", addIncomingNotification);
    };
  }, []);

  return {
    isConnected,
    notifications,
    consumeNotification,
  };
}
