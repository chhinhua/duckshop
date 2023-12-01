import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Rating from '@mui/material/Rating';

import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { IreviewOrder } from '../../../../interface/review';
import IProductCart from '../../../../interface/productCart';
import { addReview } from '../../../../apis/reviewApi';
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
    orderItem: IProductCart | undefined;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const labels: { [index: string]: string } = {
    1: 'Tệ',
    2: 'Kém',
    3: 'Được',
    4: 'Tốt',
    5: 'Xuất sắc',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const ModalReview = (propsCh: IPropsAddress) => {
    const { open, handleClose, orderItem, setLoading } = propsCh;

    // rating
    const [valueRating, setValueRating] = useState<number>(5);
    const [hoverRating, setHoverRating] = useState(-1);

    // form
    const { register, handleSubmit, setValue } = useForm<IreviewOrder>({});
    const onSubmit: SubmitHandler<IreviewOrder> = async (data) => {
        if (orderItem) {
            const objectUpdate: IreviewOrder = {
                content: data.content,
                stars: valueRating,
                itemId: orderItem.id,
                productId: orderItem.product.id,
            };
            try {
                const response = await addReview(objectUpdate);

                if (response.status === 201) {
                    toast.success('Đánh giá thành công');
                    setValue('content', '');
                    setValueRating(5);
                    setLoading((prev) => !prev);
                } else {
                    toast.error(response.data.message || response.data);
                }
            } catch (error) {
                toast.error(`${error}`);
            }

            handleClose();
        }
    };
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <div className="text-lg mb-4">
                        <span className="font-semibold">Đánh giá sản phẩm: </span> {orderItem?.product.name}
                    </div>
                    <div className="text-lg mb-4">
                        <span className="font-semibold">Phân loại: </span>
                        {orderItem?.sku.optionValues.map((item, index) => (
                            <span key={index}>{item.valueName} </span>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="font-semibold text-lg flex">
                            <span className="pr-5">Đánh sao:</span>
                            <Box
                                sx={{
                                    width: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingBottom: 3,
                                }}
                            >
                                <Rating
                                    value={valueRating}
                                    precision={1}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        setValueRating(newValue || 1);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHoverRating(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {valueRating !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hoverRating !== -1 ? hoverRating : valueRating]}</Box>
                                )}
                            </Box>
                        </div>

                        <span className="font-semibold text-lg ">Ghi đánh giá: </span>
                        <TextareaAutosize
                            minRows={9}
                            style={{ border: '1px solid #000', width: '100%', padding: '8px 12px' }}
                            {...register(`content`)}
                        />

                        <div className="float-right">
                            <Button sx={{ width: 140 }} onClick={handleClose}>
                                Trở lại
                            </Button>
                            <Button sx={{ width: 140 }} variant="contained" type="submit">
                                Xác nhận
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalReview;
