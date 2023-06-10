import { configureStore } from "@reduxjs/toolkit";
import { offerReducer } from "../features/offer-slice";

export const store = configureStore({
  reducer: offerReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
