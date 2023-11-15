import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
interface IInitialStateLogin {
    isLogin: boolean;
    idUser: string;
    userNameUser: string;
}

// Define the initial state using that type
const initialState: IInitialStateLogin = {
    isLogin: false,
    idUser: '',
    userNameUser: '',
};
// Lấy giá trị khi có từ localStorage
const savedIsLogin = localStorage.getItem('isLogin');
const savedInfoUser = localStorage.getItem('infoUser');
if (savedIsLogin) {
    initialState.isLogin = JSON.parse(savedIsLogin);
}
if (savedInfoUser) {
    const dataInfo = JSON.parse(savedInfoUser);
    initialState.idUser = dataInfo.idUser;
    initialState.userNameUser = dataInfo.userName;
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
        setInfoUser: (state, action: PayloadAction<{ idUser: string; userNameUser: string }>) => {
            state.idUser = action.payload.idUser;
            state.userNameUser = action.payload.userNameUser;
            // Lưu giá trị mới vào localStorage khi có thay đổi
            if (action.payload.idUser && action.payload.userNameUser) {
                localStorage.setItem(
                    'infoUser',
                    JSON.stringify({ userName: action.payload.userNameUser, idUser: action.payload.idUser }),
                );
            }
        },
    },
});

export const { setIsLogin } = loginSlice.actions;
export const { setInfoUser } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLogin = (state: RootState) => state.login.isLogin;
export const selectIDUser = (state: RootState) => state.login.idUser;
export const selectUserNameUser = (state: RootState) => state.login.userNameUser;

export default loginSlice.reducer;
