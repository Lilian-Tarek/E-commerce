import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist" 
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import storage from "@store/persistStorage";
import storage from 'redux-persist/es/storage'; 
// لاحظ استخدام /es/ بدل /lib/ لضمان استخدام نسخة الـ Modules الحديثة
import CategoriesSlice from '@store/Categories/CategorySlice'
import ProductsSlice from '@store/Products/ProductSlice'
import CartSlice from '@store/Cart/CartSlice'
import WishListSlice from "@store/WishList/WishListSlice";
import AuthSlice from "@store/Auth/AuthSlice"
import OrderSlice from "@store/Order/OrderSlice"
// import persistReducer from "redux-persist/es/persistReducer";
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist:["CartSlice","AuthSlice"]
};
const AuthPersistConfig = {
  key: "AuthSlice",
  storage,
  whitelist: ["user","accessToken"]
};

const CartPersistConfig = {
  // key: "root",
  key:"CartSlice",
  storage,
  whitelist: ["items"]
};
// const WishListPersistConfig = {
//   key: "wishlist",
//   storage,
//   whitelist:["ItemsIds"]
// }
const rootReducer = combineReducers({
  CategoriesSlice,
  ProductsSlice,
  CartSlice: persistReducer(CartPersistConfig, CartSlice),
  WishListSlice:WishListSlice,
    // : persistReducer(WishListPersistConfig, WishListSlice),
  AuthSlice: persistReducer(AuthPersistConfig, AuthSlice),
  OrderSlice
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { persistor,store };
