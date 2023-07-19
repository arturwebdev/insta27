import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/post/postSlice";
import postsMiddlewares from "./middleware/posts";
import searchMiddlewares from "./middleware/search";
import messagesMiddlewares from "./middleware/messages";
import { usersReducer } from "./slices/users/userSlice";
import { searchReducer } from "./slices/search/searchSlice";
import { messagesReducer } from "./slices/messages/messagesSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  posts: postReducer,
  users: usersReducer,
  search: searchReducer,
  messages: messagesReducer,
})

const persistConfig = {
  key: 'insta27',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...postsMiddlewares,
      ...searchMiddlewares,
      ...messagesMiddlewares,
    ];
  },
});

export const persistor = persistStore(store)

export default store;
