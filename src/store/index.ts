import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { dictionaryApi } from "./dictionaryApi/dictionary.api";

export const store = configureStore({
  reducer: {
    [dictionaryApi.reducerPath]: dictionaryApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(dictionaryApi.middleware),
});

setupListeners(store.dispatch);