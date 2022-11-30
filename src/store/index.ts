import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../api";

import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
