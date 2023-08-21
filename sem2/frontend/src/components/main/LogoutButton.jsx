import React from 'react';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import BasicStyles from '../Basic.module.css';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            // Send POST request to logout route
            const response = await axios.post('http://localhost:5001/users/logout');
            console.log('Logout successful:', response.data.message);
            console.log('User logged out');
            window.location.href = '/login';
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <button className={BasicStyles.LogoutButton}onClick={handleLogout} ><LogoutIcon/></button>;
};

export  {LogoutButton};
