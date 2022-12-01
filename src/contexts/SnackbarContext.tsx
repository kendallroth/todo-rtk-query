import { AlertColor, Snackbar, SnackbarContent, useTheme } from "@mui/material";
import React, { ReactElement, ReactNode, useReducer } from "react";

// Delay snackbar slightly to allow previous snackbars to close (animate) properly
const SNACKBAR_DELAY = 200;

interface ISnackbarState {
  duration: number;
  message: string;
  open: boolean;
  permanent: boolean;
  type: AlertColor;
  onDismiss: () => void;
}

type SnackbarOptions = Partial<ISnackbarState>;

export interface ISnackbarContext {
  closeNotification: () => void;
  notify: (message: string, options?: SnackbarOptions) => void;
  notifyError: (message: string, options?: SnackbarOptions) => void;
  notifySuccess: (message: string, options?: SnackbarOptions) => void;
  notifyWarning: (message: string, options?: SnackbarOptions) => void;
  /** Snackbar state/options */
  snackbar: ISnackbarState;
}

interface ISnackbarAction {
  payload?: SnackbarOptions;
  type: string;
}

type SnackbarProviderProps = {
  children?: ReactNode;
};

const initialState: ISnackbarState = {
  duration: 4000,
  permanent: false,
  message: "",
  open: false,
  type: "info",
  onDismiss: () => null,
};

const reducer = (state: ISnackbarState, action: ISnackbarAction): ISnackbarState => {
  switch (action.type) {
    case "close":
      // NOTE: Resetting all state will cause visual bugs while the snackbar closes!
      return {
        ...state,
        open: false,
      };
    case "open":
      return {
        ...initialState,
        ...action.payload,
        open: true,
      };
    default:
      return state;
  }
};

// @ts-ignore - Will be set by context provider
const SnackbarContext = React.createContext<ISnackbarContext>({});

const SnackbarProvider = (props: SnackbarProviderProps): ReactElement => {
  const { children } = props;
  const [snackbar, snackbarDispatch] = useReducer(reducer, initialState);

  const { palette } = useTheme();

  let contentStyle = {};
  switch (snackbar.type) {
    case "error":
      contentStyle = {
        backgroundColor: palette.error.main,
      };
      break;
    case "warning":
      contentStyle = {
        backgroundColor: palette.warning.main,
      };
      break;
    default:
      break;
  }

  /**
   * Handle closing the snackbar
   */
  const onDismiss = (): void => {
    closeNotification();

    snackbar?.onDismiss();
  };

  /**
   * Close the notification
   */
  const closeNotification = (): void => snackbarDispatch({ type: "close" });

  /**
   * Open a notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notify = (message: string, options: SnackbarOptions = {}): void => {
    // Close the previous notification
    closeNotification();

    // Use short timeout to allow close animation to finish
    setTimeout(() => {
      snackbarDispatch({ type: "open", payload: { ...options, message } });
    }, SNACKBAR_DELAY);
  };

  /**
   * Open an error notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notifyError = (message: string, options: SnackbarOptions = {}): void => {
    notify(message, { ...options, type: "error" });
  };

  /**
   * Open a success notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notifySuccess = (message: string, options: SnackbarOptions = {}): void => {
    notify(message, { ...options, type: "success" });
  };

  /**
   * Open a warning notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notifyWarning = (message: string, options: SnackbarOptions = {}): void => {
    notify(message, { ...options, type: "warning" });
  };

  return (
    <SnackbarContext.Provider value={{ closeNotification, notify, notifyError, notifySuccess, notifyWarning, snackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        autoHideDuration={snackbar.duration}
        ClickAwayListenerProps={{ mouseEvent: false }}
        message={snackbar.message}
        open={snackbar.open}
        onClose={onDismiss}
      >
        <SnackbarContent message={snackbar.message} sx={contentStyle} />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarProvider };
