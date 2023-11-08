import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import InputText from '../../components/InputText/InputText';
import config from '../../config';
import { useAppSelector } from '../../redux/hook';
import { getDataRegister } from '../Register/registerSlice';

type TGetOTPRegister = {
    otp: string;
};

const GetOTPRegister = () => {
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
    const onSubmit: SubmitHandler<TGetOTPRegister> = (data) => {
        console.log(data);
        // call api kiem tra OTP

        // thanhcong
        // if(){
        toast.success('Đăng kí thành công');
        navigate(config.Routes.logIn);
        // }
        // else{
        //     toast.error('Mã không hợp lệ');
        // }
    };

    //Send Again OTP
    const handleSendAgainOTP = () => {
        // call api voi Email

        toast.success('Đã gửi lại mã ');
        // email, username, pass to redux register
        console.log(dataRegister);
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
                        <Button
                            style={{ background: 'black' }}
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                        >
                            Xác thực
                        </Button>
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
