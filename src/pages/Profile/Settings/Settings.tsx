import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import InputText from '../../../components/InputText/InputText';
import config from '../../../config';
import { IInfoProfileUser } from '../../../interface/user';
import { getUserByUserNameOrEmail, updateAccountProfileOfSignedinAccount } from '../../../apis/userApi';
import { uploadAvatar } from '../../../apis/uploadImageApi';
import Avatar from '@mui/material/Avatar';

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

const Settings = () => {
    const savedInfoUser = localStorage.getItem('infoUser');
    // avatar
    const [avatar, setAvatar] = useState<string>('');

    // change gender
    const [genderUser, setGenderUser] = useState<string>('');
    const handleChangeGender = (e: SelectChangeEvent) => {
        setGenderUser(e.target.value);
    };
    // get data info user
    const handlegetInfoUser = async () => {
        if (savedInfoUser) {
            const dataInfo = JSON.parse(savedInfoUser);
            try {
                const response = await getUserByUserNameOrEmail(dataInfo.userName);

                if (response.status === 200) {
                    setAvatar(response.data.avatarUrl);
                    await setValue('username', response.data.username);
                    await setValue('name', response.data.name);
                    await setValue('email', response.data.email);
                    await setValue('phoneNumber', response.data.phoneNumber);
                    await setValue('gender', response.data.gender);

                    await setGenderUser(response.data.gender);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error('Đang bảo trì');
            }
        }
    };
    useEffect(() => {
        handlegetInfoUser();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IInfoProfileUser>();
    // submit form
    const onSubmit: SubmitHandler<IInfoProfileUser> = async (data) => {
        //  call api doi update thong tin
        const response = await updateAccountProfileOfSignedinAccount(data);

        if (response.status === 200) {
            toast.success('Cập nhật thông tin thành công');
            // cap nhat infoUser trong local
        } else {
            toast.error(response.data.message || response.data.phoneNumber);
        }
    };

    // handle change image
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setAvatar(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleSaveAvatar = async () => {
        if (!selectedImage) {
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await uploadAvatar(formData);
            if (response.status === 200) {
                toast.success('Cập nhật ảnh thành công');
            } else {
                toast.error(response.data.message || response.data);
            }

            setSelectedImage(null);
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <>
            <div className="grid grid-cols-12 relative gap-10 my-10">
                {/* start avatar */}
                <div className="col-span-12 sm:col-span-5 lg:col-span-4 xl:col-span-3 relative">
                    <div className="w-full">
                        <Button component="label" variant="text" fullWidth sx={{ borderRadius: '100%' }}>
                            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                            <Avatar
                                src={avatar}
                                sx={{
                                    width: '100%',
                                    height: '20rem',
                                    borderRadius: '100%',
                                }}
                            />
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSaveAvatar}
                            disabled={selectedImage === null ? true : false}
                        >
                            Lưu ảnh
                        </Button>
                    </div>
                </div>
                {/* end avatar */}
                {/* start account setting */}
                <div className="col-span-12 sm:col-span-7 lg:col-span-8 xl:col-span-9">
                    <div className="mb-5 font-semibold text-xl">Thông tin cá nhân</div>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* start input FullName */}
                        <InputText
                            labelInput="Name"
                            errorInput={errors.name ? true : false}
                            isRequired
                            errorFormMessage={errors.name?.message}
                            register={{
                                ...register('name', {
                                    required: ' Name is required',
                                }),
                            }}
                        />

                        {/* end input FullName */}
                        {/* start input Username */}
                        <InputText
                            labelInput="User Name"
                            errorInput={errors.username ? true : false}
                            isRequired
                            errorFormMessage={errors.username?.message}
                            register={{
                                ...register('username', {
                                    required: 'User Name is required',
                                    pattern: /^[A-Za-z0-9]{4,}$/,
                                }),
                            }}
                            disabled
                        />

                        {/* end input Username */}
                        {/* start input email */}
                        <InputText
                            labelInput="Email"
                            errorInput={errors.email ? true : false}
                            isRequired
                            typeInput="email"
                            errorFormMessage={errors.email?.message}
                            autoComplete="username"
                            register={{
                                ...register('email', {
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
                                error={errors.gender ? true : false}
                                {...register('gender')}
                                value={genderUser}
                                onChange={handleChangeGender}
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
                            errorInput={errors.phoneNumber ? true : false}
                            isRequired
                            errorFormMessage={errors.phoneNumber?.message}
                            autoComplete="phone"
                            register={{
                                ...register('phoneNumber', {
                                    required: 'Phone is required',
                                    pattern: /^[0-9]{10,}$/,
                                }),
                            }}
                        />
                        {/* end input phone */}
                        <Button
                            style={{ float: 'right' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            Cập nhật
                        </Button>
                    </form>
                </div>
                {/* end account setting */}
            </div>
        </>
    );
};

export default Settings;
