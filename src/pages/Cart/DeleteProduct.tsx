import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
interface Iprops {
    idItem: number;
    handleDeleteProduct: (idItemInCart: number) => Promise<void>;
}
const DeleteProduct = (props: Iprops) => {
    const { idItem, handleDeleteProduct } = props;
    const handleDelete = () => {
        handleDeleteProduct(idItem);
    };
    return (
        <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteProduct;
