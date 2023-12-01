import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

import config from '../../config';
import InputText from '../../components/InputText/InputText';

import { useAppDispatch } from '../../redux/hook';
import { setRegister } from './registerSlice';
import { registerApi } from '../../apis/authApi';
import { useState } from 'react';

type TResgister = {
    email: string;
    userName: string;
    passWord: string;
};

const Register = () => {
    const [isLoading, setIsLoadng] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        // setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<TResgister>({
        defaultValues: {
            email: '',
            userName: '',
            passWord: '',
        },
    });

    const onSubmit: SubmitHandler<TResgister> = async (data: TResgister) => {
        try {
            setIsLoadng(true);

            // call api dang ki va gui OTP
            const response = await registerApi(data.userName, data.email, data.passWord);

            setIsLoadng(false);

            if (response.status === 201) {
                dispatch(setRegister(data));
                toast.success(response.data);
                navigate(config.Routes.getOTPRegister);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <>
            {/* Thong bao doi */}
            <Dialog onClose={() => setIsLoadng(false)} open={isLoading} fullWidth maxWidth="sm">
                <DialogTitle>Xác thực đăng kí</DialogTitle>
                <DialogContent>
                    <LinearProgress color="success" />
                </DialogContent>
            </Dialog>
            {/* end thong bao doi */}
            <div className="m-auto pt-32 ">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            <strong>TRỞ THÀNH THÀNH VIÊN DUCK</strong>
                        </h2>
                        <h5 className="text-center text-md leading-9 tracking-tight text-gray-400">
                            Tạo hồ sơ Thành viên Duck của bạn và có quyền truy cập đầu tiên vào những sản phẩm, nguồn
                            cảm hứng và cộng đồng tốt nhất của Duck.
                        </h5>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {/* start input email */}
                            <InputText
                                labelInput="Email"
                                errorInput={errors.email ? true : false}
                                isRequired
                                errorFormMessage={errors.email?.message}
                                register={{
                                    ...register('email', {
                                        required: 'email is required',
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    }),
                                }}
                                autoComplete="email"
                            />
                            {/* end input email */}
                            {/* start input userName */}
                            <InputText
                                labelInput="Tên tài khoản phải hơn 4 kí tự"
                                errorInput={errors.userName ? true : false}
                                isRequired
                                errorFormMessage={errors.userName?.message}
                                register={{
                                    ...register('userName', {
                                        required: 'UserName is required',
                                        // pattern: /^[A-Za-z0-9]{4,}$/,
                                    }),
                                }}
                            />
                            {/* end input userName */}
                            {/* start input password */}
                            <InputText
                                labelInput="Mật khẩu phải hơn 8 kí tự"
                                errorInput={errors.passWord ? true : false}
                                isRequired
                                typeInput="password"
                                errorFormMessage={errors.passWord?.message}
                                register={{
                                    ...register('passWord', {
                                        required: 'passWord is required',
                                        // pattern: /^[a-zA-Z0-9]{8,}$/,
                                    }),
                                }}
                                autoComplete="password"
                            />
                            {/* end input password */}
                            <Button
                                style={{ background: 'black' }}
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary"
                                size="large"
                            >
                                Đăng kí
                            </Button>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-400">
                            Bạn đã có tài khoản?
                            <Link
                                to={config.Routes.logIn}
                                className="pl-1 font-semibold leading-6 text-gray-600 hover:text-black underline"
                            >
                                Đăng nhập.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
