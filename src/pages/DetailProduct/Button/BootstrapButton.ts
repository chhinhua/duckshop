import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ReactNode } from 'react';

const BootstrapButton = styled(Button)<{ children?: ReactNode }>({
    backgroundColor: 'transparent',
    borderColor: '#B9B4C7',
    color: '#000',
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#000',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,0,0,.15)',
    },
});

export default BootstrapButton;
