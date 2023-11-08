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
import { setIsLogin } from './loginSlice';

type FormData = {
    email: string;
    passWord: string;
};

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        // setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {},
    });
    // handle successful login
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // chuyen qua page home
            navigate('/');
            dispatch(setIsLogin(true));
        } else {
            dispatch(setIsLogin(false));
        }
    }, []);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await loginApi(data.email, data.passWord);
        console.log(response);

        if (response && response.data && response.data.token) {
            // handle save token
            localStorage.setItem('token', response.data.token);
            toast.success('Login Success');
            // set redux
            dispatch(setIsLogin(true));
            // chuyen next page home
            navigate('/');
        } else {
            // error
            if (response && response.status === 400) {
                toast.error(response.data.error);
            }
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
                                        pattern:
                                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+{}[]|:;<>,.?~\\-]{8,}$/,
                                    }),
                                }}
                                autoComplete="password"
                            />
                        </div>
                        <a href="#" className="text-sm font-semibold  text-gray-600 hover:text-black float-right">
                            Forgot password?
                        </a>
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
                        Not a member?
                        <Link
                            to={config.Routes.register}
                            className="pl-1 font-semibold leading-6 text-gray-600 hover:text-black underline"
                        >
                            Join Us.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
