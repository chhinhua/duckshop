import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
interface IInitialStateRegister {
    email: string;
    passWord: string;
}

// Define the initial state using that type
const initialState: IInitialStateRegister = {
    email: '',
    passWord: '',
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setRegister: (state, action: PayloadAction<IInitialStateRegister>) => {
            state.email = action.payload.email;
            state.passWord = action.payload.passWord;
        },
    },
});

export const { setRegister } = registerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getDataRegister = (state: RootState) => state.register;

export default registerSlice.reducer;
