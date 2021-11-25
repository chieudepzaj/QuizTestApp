import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import logoImg from 'src/assets/images/logo.png';
import profileIcon from 'src/assets/images/profile.png';
import routePath from 'src/constants/routePath';
import { signout } from 'src/store/auth';
import { useAppDispatch } from 'src/store/hooks';
import './styles.scss';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signout());
        navigate(routePath.SIGN_IN);
    };

    return (
        <div className='header'>
            <img className='header__logo' src={logoImg} alt='logo' />

            <div className='header__function'>
                <div className='header__function__account-icon'>
                    <img src={profileIcon} alt='logo' />Welcome, Hoang
                </div>
                <Button onClick={handleSignOut}>Logout</Button>
            </div>
        </div>
    );
};

export default Header;