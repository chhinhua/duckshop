import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
interface IInitialStateLogin {
    isLogin: boolean;
}

// Define the initial state using that type
const initialState: IInitialStateLogin = {
    isLogin: false,
};
// Thêm vào hàm reducer để cập nhật state từ giá trị được lưu trữ
const savedIsLogin = localStorage.getItem('isLogin');
if (savedIsLogin) {
    initialState.isLogin = JSON.parse(savedIsLogin);
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
            // Lưu giá trị mới vào localStorage khi có thay đổi
            localStorage.setItem('isLogin', JSON.stringify(action.payload));
        },
    },
});

export const { setIsLogin } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLogin = (state: RootState) => state.login.isLogin;

export default loginSlice.reducer;
