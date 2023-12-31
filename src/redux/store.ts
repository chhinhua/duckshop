// redux toolket
import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../pages/LogIn/loginSlice';
import registerSlice from '../pages/Register/registerSlice';
import totalProducCartSlice from '../pages/Cart/totalProducCartSlice';
import wishListSlice from '../pages/Profile/Wishlist/wishListSlice';

const store = configureStore({
    reducer: {
        login: loginSlice,
        register: registerSlice,
        totalProducCart: totalProducCartSlice,
        wishListSlice: wishListSlice,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
