import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import config from '../../config';

type FormData = {
    email: string;
    userName: string;
    passWord: string;
    fName: string;
    lName: string;
    gender: string;
};

const Register = () => {
    const {
        register,
        // setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            userName: '',
            passWord: '',
            fName: '',
            lName: '',
            gender: '',
        },
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
                        <strong>BECOME A DUCK MEMBER</strong>
                    </h2>
                    <h5 className="text-center text-md leading-9 tracking-tight text-gray-400">
                        Create your Duck Member profile and get first access to the very best of Duck products,
                        inspiration and community.
                    </h5>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* start input email */}
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            error={errors.email ? true : false}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                            autoComplete="username"
                        />
                        {errors.email && (
                            <p className="text-red-500" role="alert">
                                {errors.email.message}
                            </p>
                        )}
                        {/* end input email */}
                        {/* start input userName */}
                        <TextField
                            label="UserName"
                            type="text"
                            fullWidth
                            error={errors.userName ? true : false}
                            {...register('userName', {
                                required: 'UserName is required',
                                pattern: /^[A-Za-z0-9]{4,}$/,
                            })}
                            autoComplete="username"
                        />
                        {errors.userName && (
                            <p className="text-red-500" role="alert">
                                {errors.userName.message}
                            </p>
                        )}
                        {/* end input userName */}
                        {/* start input password */}
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
                            autoComplete="current-password"
                        />
                        {errors.passWord && (
                            <p className="text-red-500" role="alert">
                                {errors.passWord.message}
                            </p>
                        )}
                        {/* end input password */}
                        {/* start input firtname */}
                        <TextField
                            label="First Name"
                            type="text"
                            fullWidth
                            error={errors.fName ? true : false}
                            {...register('fName', {
                                required: 'First Name is required',
                            })}
                        />
                        {errors.fName && (
                            <p className="text-red-500" role="alert">
                                {errors.fName.message}
                            </p>
                        )}
                        {/* end input firtname */}
                        {/* start input lastname */}
                        <TextField
                            label="Last Name"
                            type="text"
                            fullWidth
                            error={errors.lName ? true : false}
                            {...register('lName', {
                                required: 'Last Name is required',
                            })}
                        />
                        {errors.lName && (
                            <p className="text-red-500" role="alert">
                                {errors.lName.message}
                            </p>
                        )}
                        {/* end input lastname */}
                        {/* start input Gender */}
                        <FormControl fullWidth error={errors.gender ? true : false}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                label="Gender"
                                {...register('gender', {
                                    required: 'Gender is required',
                                })}
                                defaultValue=""
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>
                        {errors.gender && (
                            <p className="text-red-500" role="alert">
                                {errors.gender.message}
                            </p>
                        )}
                        {/* end input Gender */}
                        <Button
                            style={{ background: 'black' }}
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                        >
                            Join Us
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a Member?
                        <Link
                            to={config.Routes.logIn}
                            className="pl-1 font-semibold leading-6 text-gray-600 hover:text-black underline"
                        >
                            Sign In.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
