import * as React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  usePushNotifications,
  type PushNotification,
} from "../../hooks/use-push-notifications/hook";

interface NotificationSnackbarState {
  open: boolean;
  lastNotification?: PushNotification;
}

export function NotificationSnackbar(): JSX.Element {
  const pushNotificationsHook = usePushNotifications();
  const [state, setState] = React.useState<NotificationSnackbarState>({
    open: false,
  });

  React.useEffect(() => {
    if (!state.open) {
      setState({
        open: true,
        lastNotification: pushNotificationsHook.consumeNotification(),
      });
    }
  }, [pushNotificationsHook.notifications]);

  React.useEffect(() => {
    if (!state.open) {
      const lastNotification = pushNotificationsHook.consumeNotification();
      if (lastNotification !== undefined) {
        setTimeout(() => {
          setState({
            open: true,
            lastNotification,
          });
        }, 1000);
        return;
      }
    }

    if (state.lastNotification === undefined) {
      setState({ ...state, open: false });
    }
  }, [state.open]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, open: false });
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
    <Snackbar open={state.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={state.lastNotification?.severity} action={action}>
        {state.lastNotification?.message}
      </Alert>
    </Snackbar>
  );
}
