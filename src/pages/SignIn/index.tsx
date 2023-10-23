import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false); // validate mail
    const [isValidPassword, setIsValidPassword] = useState(false); // validate password

    const handleChangeEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handleChangePassWord = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isValidEmail) {
            console.log('Khong dung dinh dang EMAIL');
            return;
        }

        if (!isValidPassword) {
            console.log('Khong dung dinh dang pass');
            return;
        }
        console.log('thanh cong');

        // Thực hiện đăng nhập ở đây nếu cả hai điều kiện đều được đáp ứng
    };

    // validate
    const validateEmail = () => {
        // Sử dụng biểu thức chính quy (regex) để kiểm tra tính hợp lệ của email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailPattern.test(email));
    };

    const validatePassword = () => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+{}[]|:;<>,.?~\\-]{8,}$/;
        setIsValidPassword(passwordPattern.test(password));
    };

    useEffect(() => {
        validateEmail();
        validatePassword();
    }, [email, password]);

    // show pass
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    return (
        <div className="m-auto pt-32">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        <strong>YOUR ACCOUNT FOR EVERYTHING DUCK</strong>
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={handleChangeEmail}
                                error={!isValidEmail}
                            />
                        </div>

                        <div className="mt-2">
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    type="password"
                                    label="Password"
                                    value={password}
                                    error={!isValidPassword}
                                >
                                    Password
                                </TextField>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    error={isValidPassword ? false : true}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    onChange={handleChangePassWord}
                                />
                            </FormControl>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" variant="contained" fullWidth color="primary" size="large">
                                Login
                            </Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Join Us.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
