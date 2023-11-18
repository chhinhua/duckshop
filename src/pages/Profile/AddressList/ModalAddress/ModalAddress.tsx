import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import IAddress from '../../../../interface/address';
import {
    addNewAddressForCurrentUser,
    getOneAddressByAddressID,
    updateAddressByAddressID,
} from '../../../../apis/addressApi';
import InputText from '../../../../components/InputText/InputText';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'white',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

interface IPropsAddress {
    open: boolean;
    handleClose: () => void;
    idAddressUpdate: number | null;
}

const ModalAddress = (propsCh: IPropsAddress) => {
    const { open, handleClose, idAddressUpdate } = propsCh;
    // get info address
    const handleGetInfoAddress = async () => {
        if (idAddressUpdate !== null) {
            const response = await getOneAddressByAddressID(idAddressUpdate);
            setValue('fullName', response.data.fullName);
            setValue('phoneNumber', response.data.phoneNumber);
            setValue('city', response.data.city);
            setValue('district', response.data.district);
            setValue('ward', response.data.ward);
            setValue('orderDetails', response.data.orderDetails);
        }
    };
    useEffect(() => {
        if (idAddressUpdate !== null) {
            handleGetInfoAddress();
        }
    }, [idAddressUpdate]);
    // form
    const {
        register: registerForm,
        handleSubmit: handleSubmitForm,
        formState: formStateForm,
        setValue,
    } = useForm<IAddress>({});
    const onSubmit: SubmitHandler<IAddress> = async (data) => {
        if (idAddressUpdate) {
            //  call api doi update thong tin
            const response = await updateAddressByAddressID(idAddressUpdate, data);
            console.log(response);

            if (response) {
                if (response.status === 200) {
                    toast.success('Cập nhật thành công');
                } else {
                    toast.error(response.data.message);
                }
            }
        } else {
            const response = await addNewAddressForCurrentUser(data);
            if (response) {
                if (response.status === 200) {
                    toast.success('Thêm thành công');
                } else {
                    toast.error(response.data.message);
                }
            }
        }
        handleClose();
    };
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <div className="text-lg mb-4">Địa chỉ mới</div>
                    <form onSubmit={handleSubmitForm(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-2">
                            <InputText
                                labelInput="Họ và tên"
                                errorInput={formStateForm.errors.fullName ? true : false}
                                isRequired
                                errorFormMessage={formStateForm.errors.fullName?.message}
                                register={{
                                    ...registerForm('fullName', {
                                        required: 'User Name is required',
                                    }),
                                }}
                                autoComplete="name"
                            />
                            <InputText
                                labelInput="SĐT"
                                errorInput={formStateForm.errors.phoneNumber ? true : false}
                                isRequired
                                errorFormMessage={formStateForm.errors.phoneNumber?.message}
                                register={{
                                    ...registerForm('phoneNumber', {
                                        required: 'Phone is required',
                                        pattern: /^[0-9]{10,}$/,
                                    }),
                                }}
                                autoComplete="phone"
                            />
                        </div>
                        <InputText
                            labelInput="Thành phố/Tỉnh"
                            errorInput={formStateForm.errors.city ? true : false}
                            isRequired
                            errorFormMessage={formStateForm.errors.city?.message}
                            register={{
                                ...registerForm('city', {
                                    required: 'City is required',
                                }),
                            }}
                        />
                        <InputText
                            labelInput="Quận/Huyện"
                            errorInput={formStateForm.errors.district ? true : false}
                            isRequired
                            errorFormMessage={formStateForm.errors.district?.message}
                            register={{
                                ...registerForm('district', {
                                    required: 'district is required',
                                }),
                            }}
                        />
                        <InputText
                            labelInput="Phường/Xã"
                            errorInput={formStateForm.errors.ward ? true : false}
                            isRequired
                            errorFormMessage={formStateForm.errors.ward?.message}
                            register={{
                                ...registerForm('ward', {
                                    required: 'ward is required',
                                }),
                            }}
                        />
                        <InputText
                            labelInput="Địa chỉ cụ thể"
                            errorInput={formStateForm.errors.orderDetails ? true : false}
                            isRequired
                            errorFormMessage={formStateForm.errors.orderDetails?.message}
                            register={{
                                ...registerForm('orderDetails', {
                                    required: 'orderDetails is required',
                                }),
                            }}
                            autoComplete="street-address"
                        />
                        <div className="float-right">
                            <Button sx={{ width: 140 }} onClick={handleClose}>
                                Trở lại
                            </Button>
                            <Button sx={{ width: 140 }} variant="contained" type="submit">
                                Hoàn thành
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalAddress;
