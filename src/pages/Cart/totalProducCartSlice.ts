import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
interface IInitialState {
    total: number;
}

// Define the initial state using that type
const initialState: IInitialState = {
    total: 0,
};
// Thêm vào hàm reducer để cập nhật state từ giá trị được lưu trữ
const saved = localStorage.getItem('totalProductInCart');

if (saved) {
    initialState.total = JSON.parse(saved);
} else {
    initialState.total = 0;
}

export const totalProducCartSlice = createSlice({
    name: 'totalProductInCart',
    initialState,
    reducers: {
        setToTalProductCart: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
            // Lưu giá trị mới vào localStorage khi có thay đổi
            localStorage.setItem('totalProductInCart', JSON.stringify(action.payload));
        },
    },
});

export const { setToTalProductCart } = totalProducCartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToTalProductCart = (state: RootState) => state.totalProducCart.total;

export default totalProducCartSlice.reducer;
