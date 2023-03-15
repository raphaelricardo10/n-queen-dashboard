import React from "react";
import { io } from "socket.io-client";

export interface PushNotificationsHook {
  isConnected: boolean;
  lastNotification?: PushNotification;
}

export interface PushNotification {
  message: string;
  severity: "info" | "warning" | "error" | "success";
}

export function usePushNotifications(): PushNotificationsHook {
  const [isConnected, setIsConnected] = React.useState(false);
  const [lastNotification, setLastNotification] =
    React.useState<PushNotification>();

  const socket = io(
    process.env.REACT_APP_NOTIFICATIONS_URI ?? "ws://127.0.0.1:3002"
  );

  React.useEffect(() => {
    const onConnect = (): void => {
      setIsConnected(true);
    };
    const onDisconnect = (): void => {
      setIsConnected(false);
    };
    const onNotification = (notification: PushNotification): void => {
      console.log(notification);
      setLastNotification(notification);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("notifications", setLastNotification);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("notifications", onNotification);
    };
  }, []);

  return {
    isConnected,
    lastNotification,
  };
}
