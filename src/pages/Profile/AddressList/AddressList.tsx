import Button from '@mui/material/Button';
import React from 'react';
import ModalAddress from './ModalAddress/ModalAddress';

interface Address {
    fullName: string;
    phoneNumber: string;
    city: string;
    district: string;
    ward: string;
    other_details: string;
    is_default?: boolean;
}

const AddressList = () => {
    // handle modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <div className="flex justify-end relative mt-5 mb-10">
                <Button onClick={handleOpen} variant="contained">
                    Thêm địa chỉ mới
                </Button>
                <span className="absolute left-0 -bottom-5 h-0.5 bg-gray-200 w-full"></span>
            </div>

            {/* start list address */}
            <div className="flex justify-between rounded border-solid border-2 p-10">
                <div>
                    <span>Le Duc</span>
                    <span className="px-3">|</span>
                    <span>0123456789</span>
                    <div>1023/13 tổ 15 khu phố 7</div>
                    <div>Phường Long Bình, Thành Phố Biên Hòa, Đồng Nai</div>
                </div>
                <div>
                    <div>
                        <Button sx={{ width: 100 }}>Cập nhật</Button>
                        <Button sx={{ width: 100 }}>Xóa</Button>
                    </div>
                    <Button sx={{ width: 200 }} variant="outlined" disabled>
                        Thiết lập mặc định
                    </Button>
                </div>
            </div>
            <div className="flex justify-between rounded border-solid border-2 p-10">
                <div>
                    <span>Le Duc</span>
                    <span className="px-3">|</span>
                    <span>0123456789</span>
                    <div>1023/13 tổ 15 khu phố 7</div>
                    <div>Phường Long Bình, Thành Phố Biên Hòa, Đồng Nai</div>
                </div>
                <div>
                    <div>
                        <Button sx={{ width: 100 }}>Cập nhật</Button>
                        <Button sx={{ width: 100 }}>Xóa</Button>
                    </div>
                    <Button sx={{ width: 200 }} variant="outlined">
                        Thiết lập mặc định
                    </Button>
                </div>
            </div>
            {/* end list address */}

            <ModalAddress open={open} handleClose={handleClose} />
        </div>
    );
};

export default AddressList;
