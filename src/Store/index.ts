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
// import persistReducer from "redux-persist/es/persistReducer";
// const rootPersistConfig = {
//   key: "root",
//   storage,
//   whitelist:["CartSlice"]
// };
const CartPersistConfig = {
  key: "root",
  storage,
  whitelist: ["items"]
};
const WishListPersistConfig = {
  key: "wishlist",
  storage,
  whitelist:["ItemsIds"]
}
const rootReducer = combineReducers({
  CategoriesSlice,
  ProductsSlice,
  CartSlice: persistReducer(CartPersistConfig, CartSlice),
  WishListSlice: persistReducer(WishListPersistConfig, WishListSlice)
});
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
const store = configureStore({
  reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { persistor,store };
