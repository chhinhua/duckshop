import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { ChangeEvent, useState } from 'react';

import S2Baner1 from '../../../../assets/img/LandingPage/section-2-1.png';
import Image from '../../../../components/Image';

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
const UploadImage = () => {
    // handle change image
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
        //   toast
        // call api update anh
        //
        //
        //
    };
    return (
        <>
            <Image src={selectedImage || S2Baner1} className="w-full xs:h-96 h-52 " />
            <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                        color: 'black',
                        backgroundColor: '#fff',
                    },
                }}
            >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
            </Button>
        </>
    );
};

export default UploadImage;
