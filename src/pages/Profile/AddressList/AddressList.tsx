import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalAddress from './ModalAddress/ModalAddress';
import IAddress from '../../../interface/address';
import { deleteAddressByAddressID, getListAddressOffCurrentUser, setDefaultAddress } from '../../../apis/addressApi';

const AddressList = () => {
    // Save idAddress
    const [idAddressUpdate, setIDAddressUpdate] = useState<number | null>(1);

    // modal
    const [open, setOpen] = useState(false);
    // handle create new
    const handleCreateNew = () => {
        setOpen(true);
        setIDAddressUpdate(null);
    };

    // handle  update
    const handleUpdate = async (idAddress: number) => {
        setOpen(true);
        setIDAddressUpdate(idAddress);
    };
    const handleClose = () => setOpen(false);

    // handle default
    const [idLoading, setIsLoading] = useState<boolean>(false);
    const handleSetDefault = async (idAddress: number) => {
        const response = await setDefaultAddress(idAddress);
        if (response.status === 200) {
            setIsLoading((prev) => !prev);
            toast.success('Địa chỉ mặc định đã thay đổi');
        } else {
            toast.error(response.data.message);
        }
    };
    // handle delete address by ID
    const deleteAddress = async (idAddress: number) => {
        const response = await deleteAddressByAddressID(idAddress);
        if (response.status === 200) {
            setIsLoading((prev) => !prev);
            toast.success(response.data);
        } else {
            toast.error(response.data.message);
        }
    };

    // handle get list address
    const [listAddress, setListAddress] = useState<Array<IAddress>>([]);
    const getListAddress = async () => {
        const response = await getListAddressOffCurrentUser();
        if (response.status === 200) {
            if (response?.data) {
                setListAddress(response.data);
            }
        } else {
            toast.error(response.data.message);
        }
    };
    useEffect(() => {
        getListAddress();
    }, [open, idLoading]);
    return (
        <div>
            <div className="flex justify-end relative mt-5 mb-10">
                <Button onClick={handleCreateNew} variant="contained">
                    Thêm địa chỉ mới
                </Button>
                <span className="absolute left-0 -bottom-5 h-0.5 bg-gray-200 w-full"></span>
            </div>

            {/* start list address */}
            {listAddress.map((item, index) => (
                <div className="flex justify-between rounded border-solid border-2 p-10" key={index}>
                    <div>
                        <span>{item.fullName}</span>
                        <span className="px-3">|</span>
                        <span>{item.phoneNumber}</span>
                        <div>{item.orderDetails}</div>
                        <div>
                            {item.ward}, {item.district}, {item.city}
                        </div>
                    </div>
                    <div>
                        <div>
                            <Button sx={{ width: 100 }} onClick={() => handleUpdate(item.id)}>
                                Cập nhật
                            </Button>
                            {!item.isDefault && (
                                <Button sx={{ width: 100 }} onClick={() => deleteAddress(item.id)}>
                                    Xóa
                                </Button>
                            )}
                        </div>
                        <Button
                            sx={{ width: 200 }}
                            variant="outlined"
                            disabled={item.isDefault ? true : false}
                            onClick={() => handleSetDefault(item.id)}
                        >
                            Thiết lập mặc định
                        </Button>
                    </div>
                </div>
            ))}
            {/* end list address */}

            {open && <ModalAddress open={open} handleClose={handleClose} idAddressUpdate={idAddressUpdate} />}
        </div>
    );
};

export default AddressList;
