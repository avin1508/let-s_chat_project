import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistAuthReducer } from "./persistor/reduxPersist";

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/ChatSLice";

const rootReducer = combineReducers({
  auth: persistAuthReducer(authReducer),
  user: userReducer,
  chat: chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
