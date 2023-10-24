import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import config from '../../config';

type FormData = {
    email: string;
    passWord: string;
};

const LogIn = () => {
    const {
        register,
        // setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {},
    });

    const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
    // show pass
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                            <TextField
                                label="Email"
                                type="text"
                                fullWidth
                                error={errors.email ? true : false}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500" role="alert">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="mt-2">
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                error={errors.passWord ? true : false}
                                {...register('passWord', {
                                    required: 'Password is required',
                                    pattern:
                                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+{}[]|:;<>,.?~\\-]{8,}$/,
                                })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {errors.passWord && (
                                <p className="text-red-500" role="alert">
                                    {errors.passWord.message}
                                </p>
                            )}
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
