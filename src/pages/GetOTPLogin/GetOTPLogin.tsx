import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import InputText from '../../components/InputText/InputText';
import config from '../../config';

import { sendOTPRegister, verifyOTPRegister } from '../../apis/authApi';

type TGetOTPLogin = {
    otp: string;
    email: string;
};

const GetOTPRegister = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<TGetOTPLogin>({
        defaultValues: {
            otp: '',
            email: '',
        },
    });

    // send OTP
    const onSubmit: SubmitHandler<TGetOTPLogin> = async (data) => {
        // call api kiem tra OTP
        const response = await verifyOTPRegister(data.email, data.otp);

        if (response.status === 200) {
            toast.success(response.data);
            navigate(config.Routes.logIn);
        } else {
            toast.error(response.data.message);
        }
    };

    //Send Again OTP
    const handleSendAgainOTP = async () => {
        // call api voi Email
        const response = await sendOTPRegister(getValues().email);

        if (response.status) {
            toast.error(response.data.message);
        }
        if (response.data) {
            toast.warning(response.data);
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
                        <Button
                            style={{ background: 'black' }}
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                        >
                            Xác thực
                        </Button>{' '}
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
