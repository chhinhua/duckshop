import config from '../../config';
import InputText from '../../components/InputText/InputText';
import { loginApi } from '../../apis/authApi';

import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '../../redux/hook';
import { setInfoUser, setIsLogin } from './loginSlice';
import { getCountOfItems } from '../../apis/cartApi';
import { setToTalProductCart } from '../Cart/totalProducCartSlice';

type FormData = {
    email: string;
    passWord: string;
};

const MESS_XACTHUC = 'Tài khoản chưa được xác thực';

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            passWord: '',
        },
    });
    // handle successful login
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            // chuyen qua page home
            navigate('/');
        }
    }, []);

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const regexEmailOrUserName = /^(?=.*[A-Za-z0-9])[A-Za-z0-9@._-]{4,}$/;
        const regexPass = /^[a-zA-Z0-9]{8,}$/;
        if (!regexEmailOrUserName.test(data.email)) {
            toast.error('Email chưa đúng định dạng');
        } else if (!regexPass.test(data.passWord)) {
            toast.error('Mật khẩu phải trên 8 kí tự và không chứa kí tự đặc biệt');
        } else {
            const response = await loginApi(data.email, data.passWord);

            if (response?.data?.jwt) {
                toast.success('Đăng nhập thành công');
                // set redux
                dispatch(setIsLogin(true));
                dispatch(setInfoUser({ userNameUser: response.data.user.username, idUser: response.data.user.id }));
                getTotalItemOfCart();
                // chuyen next page home
                navigate('/');
            }
            // error
            if (response.data.message === MESS_XACTHUC) {
                toast.error(response.data.message);
                navigate(config.Routes.getOTPLogIn);
            } else {
                if (response && response.status) {
                    toast.error(response.data.message);
                }
            }
        }
    };

    // handle số lượng sản phẩm trong giỏ hàng
    const getTotalItemOfCart = async () => {
        const totalProductInCart = await getCountOfItems();
        if (totalProductInCart.status === 200) {
            dispatch(setToTalProductCart(+totalProductInCart.data));
        }
    };

    return (
        <div className="m-auto pt-32">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        <strong>YOUR ACCOUNT FOR EVERYTHING DUCK</strong>
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2">
                            <InputText
                                labelInput="Email hoặc username"
                                errorInput={errors.email ? true : false}
                                isRequired
                                errorFormMessage={errors.email?.message}
                                register={{
                                    ...register('email', {
                                        required: 'email is required',
                                    }),
                                }}
                                autoComplete="username"
                            />
                        </div>

                        <div className="mt-2">
                            <InputText
                                labelInput="Password"
                                errorInput={errors.passWord ? true : false}
                                isRequired
                                typeInput="password"
                                errorFormMessage={errors.passWord?.message}
                                register={{
                                    ...register('passWord', {
                                        required: 'passWord is required',
                                    }),
                                }}
                                autoComplete="password"
                            />
                        </div>
                        <Link
                            to={config.Routes.getOTPLogIn}
                            className="text-sm font-semibold  text-gray-600 hover:text-black float-right"
                        >
                            Xác nhận bằng Email
                        </Link>
                        <Button
                            style={{ background: 'black' }}
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                        >
                            Login
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Chưa có tài khoản?
                        <Link
                            to={config.Routes.register}
                            className="pl-1 font-semibold leading-6 text-gray-600 hover:text-black underline"
                        >
                            Đăng kí.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
