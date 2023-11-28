import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../redux/store';

// Define a type for the slice state
interface IInitialState {
    total: number;
}

// Define the initial state using that type
const initialState: IInitialState = {
    total: 0,
};
// Thêm vào hàm reducer để cập nhật state từ giá trị được lưu trữ
const saved = localStorage.getItem('totalWishList');

if (saved) {
    initialState.total = JSON.parse(saved);
} else {
    initialState.total = 0;
}

export const wishListSlice = createSlice({
    name: 'totalWishList',
    initialState,
    reducers: {
        setToTalWishList: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
            // Lưu giá trị mới vào localStorage khi có thay đổi
            localStorage.setItem('totalWishList', JSON.stringify(action.payload));
        },
    },
});

export const { setToTalWishList } = wishListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToTalWishList = (state: RootState) => state.wishListSlice.total;

export default wishListSlice.reducer;
