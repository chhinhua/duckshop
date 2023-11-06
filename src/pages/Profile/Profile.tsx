import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Dashboard from './Dashboard/Dashboard';
import Wishlist from './Wishlist/Wishlist';
import PurchaseHistory from './PurchaseHistory/PurchaseHistory';
import Settings from './Settings/Settings';

const Profile = () => {
    const [valuePage, setValuePage] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValuePage(newValue);
    };
    return (
        <div className="w-full m-auto pt-32">
            <div className="bg-headerProfile h-60 flex place-items-end place-content-center">
                <div className="w-11/12 bg-white h-3/4 flex place-items-center place-content-center border-2 border-headerProfile">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 76, height: 76 }} />
                    <div className="ml-5">
                        <div className="uppercase font-semibold text-2xl">Le Van Anh Duc</div>
                        <div className="text-sm text-gray-400">Customer</div>
                    </div>
                </div>
            </div>
            <div className="w-11/12 m-auto">
                <TabContext value={valuePage}>
                    <Box sx={{ borderBottom: 2, borderColor: '#FFEEE8' }}>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Dashboard" value="1" />
                            <Tab label="Wishlist" value="2" />
                            <Tab label="Purchase History" value="3" />
                            <Tab label="Settings" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: 0 }}>
                        <Dashboard />
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: 0 }}>
                        <Wishlist />
                    </TabPanel>
                    <TabPanel value="3" sx={{ padding: 0 }}>
                        <PurchaseHistory />
                    </TabPanel>
                    <TabPanel value="4" sx={{ padding: 0 }}>
                        <Settings />
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );
};

export default Profile;
