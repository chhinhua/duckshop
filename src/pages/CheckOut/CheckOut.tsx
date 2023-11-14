import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import config from '../../config';
import Textarea from '../../components/Textarea/Textarea';

interface FormData {
    paymentType: string;
    note: string;
    address: string;
}
const Pay = () => {
    const {
        register,
        // setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            paymentType: '',
            note: '',
            address: '',
        },
    });

    // check
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
        setIsChecked(event.target.checked);
    };

    // submit form
    const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

    return (
        <div className="w-11/12 m-auto pt-32">
            <div className="grid sm:grid-cols-2 gap-10 sm:grid-row-2 lg:gap-20">
                {/* start infomation */}
                <div>
                    <div className="mb-5 font-semibold text-xl">What's your contact information?</div>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* start input PaymentType */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">Hình thức thanh toán</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                input={<OutlinedInput label="Hình thức thanh toán" />}
                                fullWidth
                                error={errors.paymentType ? true : false}
                                defaultValue={''}
                                {...register('paymentType', {
                                    required: 'PaymentType is required',
                                })}
                            >
                                <MenuItem value={config.PaymentType.Offilne}>{config.PaymentType.Offilne}</MenuItem>
                                <MenuItem value={config.PaymentType.Online}>{config.PaymentType.Online}</MenuItem>
                            </Select>
                        </FormControl>
                        {/* end input PaymentType */}
                        {/* start input address */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">Địa chỉ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                input={<OutlinedInput label="Địa chỉ" />}
                                fullWidth
                                error={errors.address ? true : false}
                                defaultValue={''}
                                {...register('address', {
                                    required: 'address is required',
                                })}
                            >
                                <MenuItem value={'1'}>Địa chỉ 1</MenuItem>
                                <MenuItem value={'2'}>Địa chỉ 2</MenuItem>
                            </Select>
                        </FormControl>
                        {/* end input address */}
                        {/* start input firtname */}
                        <Textarea
                            register={{
                                ...register('note'),
                            }}
                        />
                        {/* end input firtname */}
                        <Button
                            style={{ background: isChecked ? 'black' : '', height: '50px' }}
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                            disabled={!isChecked}
                        >
                            Continue
                        </Button>
                        <div className="grid grid-cols-10">
                            <span>
                                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                            </span>
                            <span className="col-span-9 text-gray-400">
                                I have read and consent to eShopWorld processing my information in accordance with the
                                <span className="underline ml-0.5">Privacy Statement</span> and
                                <span className="underline ml-0.5">Cookie Policy </span>. eShopWorld is a trusted Duck
                                partner.
                            </span>
                        </div>
                    </form>
                </div>
                {/* end infomation */}
                {/* start bill */}
                <div className="space-y-5">
                    <h1 className="text-2xl font-semibold text-center">Summary</h1>
                    <div className="grid grid-cols-3">
                        <span className="text-left col-span-2">Subtotal</span>
                        <span className="text-right">890 $</span>
                    </div>
                    <div className="grid grid-cols-3">
                        <span className="text-left col-span-2">Estimated Delivery & Handling</span>
                        <span className="text-right">Free</span>
                    </div>
                    <div className="grid grid-cols-3 relative py-10">
                        <span className="absolute left-0 top-5 h-0.5 bg-gray-200 w-full"></span>
                        <span className="text-left col-span-2">Total</span>
                        <span className="text-right">890 $</span>
                        <span className="absolute left-0 bottom-5 h-0.5 bg-gray-200 w-full"></span>
                    </div>
                    <div className="text-center text-gray-400">
                        (The total reflects the price of your order, including all duties and taxes)
                    </div>
                    <div className="font-semibold text-xl text-center pt-10">How would you like to get your order?</div>
                    <div className="text-gray-400">
                        Customs regulation require a copy of the recipient's KYC. The address on the KYC needs to match
                        the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC.
                        The KYC will be stored securely and used solely for the purpose of clearing customs (including
                        sharing it with customs officials) for all orders and returns. If your KYC does not match your
                        shipping address, please click the link for more information.{' '}
                        <span className="underline hover:text-black">Learn More</span>
                    </div>
                </div>
                {/* end bill */}
            </div>
        </div>
    );
};

export default Pay;
