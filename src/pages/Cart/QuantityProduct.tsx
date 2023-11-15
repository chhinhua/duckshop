import HorizontalRule from '@mui/icons-material/HorizontalRule';
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import { useCallback, useEffect, useState } from 'react';

interface IProps {
    valueQuantity: number;
    idItem: number;
    handleChangeItemQuantity: (idItemInCart: number, quantity: number) => Promise<void>;
}

const QuantityProduct = (props: IProps) => {
    const { valueQuantity, idItem, handleChangeItemQuantity } = props;
    const [quantity, setQuantity] = useState<number>(valueQuantity);
    const [disableDecrease, setDisableDecrease] = useState<boolean>(true);
    //  change quantity
    const handleDecrease = useCallback(() => {
        setQuantity((prev) => {
            if (prev - 1 <= 0) {
                return prev;
            } else {
                return prev - 1;
            }
        });
    }, []);
    const handleIncrease = useCallback(() => {
        setQuantity((prev) => prev + 1);
    }, []);
    const handleChange = useCallback((e: { target: { value: string } }) => {
        setQuantity(+e.target.value);
    }, []);

    useEffect(() => {
        handleChangeItemQuantity(idItem, quantity);
        quantity <= 1 ? setDisableDecrease(false) : setDisableDecrease(true);
    }, [quantity]);
    return (
        <div className="flex">
            <Button variant="text" onClick={handleDecrease} disabled={disableDecrease ? false : true}>
                <HorizontalRule fontSize="small" />
            </Button>
            <input className="rounded border-2 h-10 w-14 text-center" value={quantity} onChange={handleChange} />
            <Button variant="text" onClick={handleIncrease}>
                <Add fontSize="small" />
            </Button>
        </div>
    );
};

export default QuantityProduct;
