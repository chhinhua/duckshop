import { useForm, SubmitHandler } from 'react-hook-form';

import S2Baner1 from '../../../assets/img/LandingPage/section-2-1.png';
import InputText from '../../../components/InputText/InputText';
import Image from '../../../components/Image';

import React, { ChangeEvent, useCallback, useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import config from '../../../config';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface FormData {
    email: string;
    phone: string;
    userName: string;
    name: string;
    gender: string;
}
interface FormPassWord {
    currentPassWord: string;
    newPassWord: string;
    confirmPassWord: string;
}
enum AlertColor {
    Error = 'error',
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
}
interface IToast {
    message: string;
    alert: AlertColor;
}

const Settings = () => {
    const {
        register: registerForm1,
        handleSubmit: handleSubmitForm1,
        formState: formStateForm1,
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            phone: '',
            userName: '',
            name: '',
            gender: '',
        },
    });
    const {
        register: registerForm2,
        handleSubmit: handleSubmitForm2,
        formState: formStateForm2,
    } = useForm<FormPassWord>({
        defaultValues: {
            currentPassWord: '',
            newPassWord: '',
            confirmPassWord: '',
        },
    });
    // submit form
    const [textToast, setTextToast] = useState<IToast>({ message: 'Lỗi kìa', alert: AlertColor.Error });
    const onSubmit1: SubmitHandler<FormData> = (data) => {
        console.log(data);
        handleToggleToast();
        setTextToast((prev) => ({
            ...prev,
            alert: AlertColor.Success,
            message: 'Cập nhật thông tin thành công',
        }));
        //  call api doi update thong tin
        //
        //
    };
    const onSubmit2: SubmitHandler<FormPassWord> = (data) => {
        if (data.newPassWord !== data.confirmPassWord) {
            handleToggleToast();
            setTextToast((prev) => ({
                ...prev,
                alert: AlertColor.Error,
                message: 'Mật khẩu mới và nhập lại mật khẩu khác nhau',
            }));
        } else {
            handleToggleToast();
            setTextToast((prev) => ({
                ...prev,
                alert: AlertColor.Success,
                message: 'Đổi mật khẩu thành công',
            }));
            //  call api doi mk
            //
            //
        }
    };
    // handle show toast
    const [showToast, setShowToast] = useState(false);
    const handleToggleToast = useCallback(() => {
        setShowToast((prev) => !prev);
    }, []);

    // handle change image
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
        handleToggleToast();
        setTextToast((prev) => ({
            ...prev,
            alert: AlertColor.Success,
            message: 'Cập nhật ảnh thành công',
        }));
        // call api update anh
        //
        //
        //
    };
    return (
        <>
            {/* toast */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showToast}
                onClose={handleToggleToast}
            >
                <Alert severity={textToast.alert}>
                    <AlertTitle className="uppercase w-52 md:w-80">{textToast.alert}</AlertTitle>
                    {textToast.message}
                </Alert>
            </Snackbar>
            {/* end toast */}
            <div className="my-10 ">
                {/* start section 1 */}
                <div className="grid grid-cols-12 relative gap-10">
                    {/* start avatar */}
                    <div className="col-span-12 sm:col-span-5 lg:col-span-4 xl:col-span-3 relative">
                        <Image src={selectedImage || S2Baner1} className="w-full xs:h-96 h-52 " />

                        <Button
                            component="label"
                            variant="outlined"
                            fullWidth
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                backgroundColor: 'black',
                                color: 'white',
                                '&:hover': {
                                    color: 'black',
                                    backgroundColor: '#fff',
                                },
                            }}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                        </Button>
                    </div>
                    {/* end avatar */}
                    {/* start account setting */}
                    <div className="col-span-12 sm:col-span-7 lg:col-span-8 xl:col-span-9">
                        <div className="mb-5 font-semibold text-xl">Account settings</div>
                        <form className="space-y-6" onSubmit={handleSubmitForm1(onSubmit1)}>
                            {/* start input FullName */}
                            <InputText
                                labelInput="Name"
                                errorInput={formStateForm1.errors.name ? true : false}
                                isRequired
                                errorFormMessage={formStateForm1.errors.name?.message}
                                register={{
                                    ...registerForm1('name', {
                                        required: ' Name is required',
                                    }),
                                }}
                            />

                            {/* end input FullName */}
                            {/* start input Username */}
                            <InputText
                                labelInput="Enter your username more than 4 characters"
                                errorInput={formStateForm1.errors.userName ? true : false}
                                isRequired
                                errorFormMessage={formStateForm1.errors.userName?.message}
                                register={{
                                    ...registerForm1('userName', {
                                        required: 'User Name is required',
                                        pattern: /^[A-Za-z0-9]{4,}$/,
                                    }),
                                }}
                            />
                            {/* end input Username */}
                            {/* start input email */}
                            <InputText
                                labelInput="Email"
                                errorInput={formStateForm1.errors.email ? true : false}
                                isRequired
                                typeInput="email"
                                errorFormMessage={formStateForm1.errors.email?.message}
                                autoComplete="username"
                                register={{
                                    ...registerForm1('email', {
                                        required: 'Email is required',
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    }),
                                }}
                            />

                            {/* end input email */}
                            {/* start input gender */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Giới tính</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    input={<OutlinedInput label="Giới tính" />}
                                    fullWidth
                                    {...registerForm1('gender', {
                                        required: 'Gender is required',
                                    })}
                                    error={formStateForm1.errors.gender ? true : false}
                                >
                                    <MenuItem value={config.Gender.NAM}>{config.Gender.NAM}</MenuItem>
                                    <MenuItem value={config.Gender.NU}>{config.Gender.NU}</MenuItem>
                                    <MenuItem value={config.Gender.ORTHER}>{config.Gender.ORTHER}</MenuItem>
                                </Select>
                            </FormControl>
                            {/* end input gender */}
                            {/* start input phone */}
                            <InputText
                                labelInput="Phone must contain 10 digits"
                                typeInput="number"
                                errorInput={formStateForm1.errors.phone ? true : false}
                                isRequired
                                errorFormMessage={formStateForm1.errors.phone?.message}
                                autoComplete="phone"
                                register={{
                                    ...registerForm1('phone', {
                                        required: 'Phone is required',
                                        pattern: /^[0-9]{10,}$/,
                                    }),
                                }}
                            />
                            {/* end input phone */}
                            <Button
                                style={{ float: 'right', width: '100px' }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Save
                            </Button>
                        </form>
                    </div>
                    {/* end account setting */}
                    <span className="absolute left-0 -bottom-6 h-0.5 bg-gray-200 w-full"></span>
                </div>
                {/* end section 1 */}
                {/* start section 2 */}
                <div className="py-10 h-full w-full sm:w-7/12 m-auto text-center">
                    <div className="mb-5 font-semibold text-xl">Account settings</div>
                    <form className="space-y-6" onSubmit={handleSubmitForm2(onSubmit2)}>
                        {/* start input password */}
                        <InputText
                            labelInput="Current PassWord"
                            errorInput={formStateForm2.errors.currentPassWord ? true : false}
                            isRequired
                            typeInput="password"
                            errorFormMessage={formStateForm2.errors.currentPassWord?.message}
                            register={{
                                ...registerForm2('currentPassWord', {
                                    required: 'CurrentPassWord is required',
                                }),
                            }}
                        />
                        {/* end input password */}
                        {/* start new password */}
                        <InputText
                            labelInput="New PassWord"
                            errorInput={formStateForm2.errors.newPassWord ? true : false}
                            isRequired
                            typeInput="password"
                            errorFormMessage={formStateForm2.errors.newPassWord?.message}
                            register={{
                                ...registerForm2('newPassWord', {
                                    required: 'NewPassWord is required',
                                }),
                            }}
                        />
                        {/* end new password */}
                        {/* start comfirm password */}
                        <InputText
                            labelInput="Confirm PassWord"
                            errorInput={formStateForm2.errors.confirmPassWord ? true : false}
                            isRequired
                            typeInput="password"
                            errorFormMessage={formStateForm2.errors.confirmPassWord?.message}
                            register={{
                                ...registerForm2('confirmPassWord', {
                                    required: 'Confirm PassWord is required',
                                }),
                            }}
                        />
                        {/* end comfirm password */}
                        <Button
                            style={{ float: 'right', width: '100px' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Save
                        </Button>
                    </form>
                </div>

                {/* end section 2 */}
            </div>
        </>
    );
};

export default Settings;
