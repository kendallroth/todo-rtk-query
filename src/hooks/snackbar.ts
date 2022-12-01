import { useContext } from "react";

// Utilities
import { ISnackbarContext, SnackbarContext } from "../contexts";

/**
 * Expose snackbar manager context as hook
 *
 * @returns Snackbar manager
 */
const useSnackbar = (): ISnackbarContext => {
  const snackbar = useContext(SnackbarContext);

  // TODO: Determine if there is a way to prevent removing automatically when transitioning between
  //         routes, and whether this would even be desired?

  return snackbar;
};

export { useSnackbar };
