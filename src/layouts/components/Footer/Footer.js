import IconButton from '@mui/material/IconButton';
import Twitter from '@mui/icons-material/Twitter';
import Facebook from '@mui/icons-material/Facebook';
import YouTube from '@mui/icons-material/YouTube';
import Instagram from '@mui/icons-material/Instagram';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: '',
    '&:hover': {
        backgroundColor: '', // Bạn có thể thay đổi màu hover tùy ý
    },
    textTransform: 'none',
}));

function Footer() {
    const now = new Date();
    const currentYear = now.getFullYear();
    return (
        <div className="bg-footer w-full px-10 pt-10 pb-5 bottom-0 left-0 mt-10">
            <div className="w-11/12 h-full flex  m-auto">
                <div className="flex flex-row w-full justify-between h-full lg:gap-24 gap-5 flex-wrap">
                    <div className="flex flex-col items-start text-base not-italic font-normal gap-0">
                        <CustomButton>FIND A STORE</CustomButton>
                        <CustomButton>BECOME A MEMBER</CustomButton>
                        <CustomButton>SEND US FEEDBACK</CustomButton>
                    </div>
                    <div className="flex flex-col items-start  text-base not-italic font-normal gap-0">
                        <CustomButton>GET HELP</CustomButton>
                        <CustomButton>Order Status</CustomButton>
                        <CustomButton>Delivery</CustomButton>

                        <CustomButton>Contact Us</CustomButton>
                    </div>
                    <div className="flex flex-col items-start text-base not-italic font-normal gap-0">
                        <CustomButton>ORDER</CustomButton>
                        <CustomButton>Returns</CustomButton>
                        <CustomButton>Payment Options</CustomButton>
                        <CustomButton>Collect in store</CustomButton>
                    </div>
                    <div className="flex flex-col items-start text-base not-italic font-normal gap-0">
                        <CustomButton>ABOUT DUCK</CustomButton>
                        <CustomButton>Newspaper</CustomButton>
                        <CustomButton>Careers</CustomButton>
                        <CustomButton>Investors</CustomButton>
                        <CustomButton>Sustainability</CustomButton>
                    </div>
                </div>
            </div>
            <div className="w-11/12 pt-10 flex flex-wrap justify-between m-auto">
                <div className="text-base not-italic font-normal ">© {currentYear} Color. All Rights Reserved</div>
                <div className="h-full flex gap-3">
                    <IconButton>
                        <Twitter />
                    </IconButton>
                    <IconButton>
                        <Facebook />
                    </IconButton>
                    <IconButton>
                        <YouTube />
                    </IconButton>
                    <IconButton>
                        <Instagram />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Footer;
