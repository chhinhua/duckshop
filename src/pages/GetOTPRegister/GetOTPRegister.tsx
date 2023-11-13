import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import InputText from '../../components/InputText/InputText';
import { useAppSelector } from '../../redux/hook';
import { getDataRegister } from '../Register/registerSlice';
import { loginApi, sendOTPRegister, verifyOTPRegister } from '../../apis/authApi';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/hook';
import { setInfoUser, setIsLogin } from '../LogIn/loginSlice';
import config from '../../config';

type TGetOTPRegister = {
    otp: string;
};

const GetOTPRegister = () => {
    const [verify, setVerify] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dataRegister = useAppSelector(getDataRegister);

    const {
        register,
        // setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<TGetOTPRegister>({
        defaultValues: {
            otp: '',
        },
    });

    // send OTP
    const onSubmit: SubmitHandler<TGetOTPRegister> = async (data) => {
        // call api kiem tra OTP
        if (dataRegister.email !== '') {
            const response = await verifyOTPRegister(dataRegister.email, data.otp);
            if (response.status === 200) {
                toast.success(response.data);
                setVerify(true);
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error('Do đã refresh nên mất lưu trữ email');
            navigate(config.Routes.getOTPLogIn);
            setVerify(false);
        }
    };

    //Send Again OTP
    const handleSendAgainOTP = async () => {
        // call api voi Email
        const response = await sendOTPRegister(dataRegister.email);
        if (response.status === 200) {
            toast.success(response.data);
        } else {
            toast.error('Loi roi');
        }
    };
    // login
    const handleLogin = async () => {
        const response = await loginApi(dataRegister.email, dataRegister.passWord);

        if (response && response.data && response.data.jwt) {
            toast.success('Đăng nhập thành công');
            // set redux
            dispatch(setIsLogin(true));
            dispatch(setInfoUser({ userNameUser: response.data.user.username, idUser: response.data.user.id }));
            // chuyen next page home
            navigate('/');
        }
        // error
        if (response && response.status) {
            toast.error(response.data.message);
        }
    };
    return (
        <div className="m-auto pt-32">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        <strong>Nhập mã xác thực</strong>
                    </h2>
                    <h5 className="text-center text-md leading-9 tracking-tight text-gray-400">
                        Mã xác thực sẽ được gửi qua Email
                    </h5>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* start input otp */}
                        <InputText
                            labelInput="OTP"
                            errorInput={errors.otp ? true : false}
                            isRequired
                            errorFormMessage={errors.otp?.message}
                            register={{
                                ...register('otp', {
                                    required: 'OTP is required',
                                    pattern: /^[A-Za-z0-9]{4,}$/,
                                }),
                            }}
                        />
                        {/* end input otp */}
                        <div className="grid grid-cols-2 gap-2">
                            <Button type="submit" variant="contained" fullWidth size="large">
                                Xác thực
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={verify ? false : true}
                                onClick={handleLogin}
                            >
                                Đăng nhập ngay
                            </Button>
                        </div>
                        <Button variant="outlined" fullWidth size="large" onClick={handleSendAgainOTP}>
                            Gửi lại mã
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetOTPRegister;
