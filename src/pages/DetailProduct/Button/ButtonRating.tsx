import Button from '@mui/material/Button';

const ButtonRating = ({ children }) => {
    return (
        <Button
            sx={{
                width: '120px',
                background: 'white',
                color: 'black',
                border: '1px solid #B4B4B3',
                '&:active': {
                    borderColor: 'red',
                },
                '&:focus': {
                    color: '#E48F45',
                    border: 'none',
                    boxShadow: '0 0 0 0.2rem #E48F45',
                },
            }}
        >
            {children}
        </Button>
    );
};

export default ButtonRating;
