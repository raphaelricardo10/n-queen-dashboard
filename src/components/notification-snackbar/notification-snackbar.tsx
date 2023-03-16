import * as React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  usePushNotifications,
  type PushNotification,
} from "../../hooks/use-push-notifications/hook";

export function NotificationSnackbar(): JSX.Element {
  const pushNotificationsHook = usePushNotifications();
  const [open, setOpen] = React.useState(false);
  const [lastNotification, setLastNotification] =
    React.useState<PushNotification>();

  React.useEffect(() => {
    if (!open) {
      setOpen(true);
      setLastNotification(pushNotificationsHook.consumeNotification());
    }
  }, [pushNotificationsHook.notifications]);

  React.useEffect(() => {
    if (!open) {
      const notification = pushNotificationsHook.consumeNotification();
      if (notification !== undefined) {
        setTimeout(() => {
          setLastNotification(notification);
          setOpen(true);
        }, 1000);
      }
    }
  }, [open]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={lastNotification?.severity} action={action}>
        {lastNotification?.message}
      </Alert>
    </Snackbar>
  );
}
