import { Button } from 'antd';
import React from 'react';

import logoImg from 'src/assets/images/logo.png';
import profileIcon from 'src/assets/images/profile.png';
import './styles.scss';

const Header: React.FC = () => {
    return (
        <div className='header'>
            <img className='header__logo' src={logoImg} alt='logo' />

            <div className='header__function'>
                <div className='header__function__account-icon'>
                    <img src={profileIcon} alt='logo' />Welcome, Hoang
                </div>
                <Button>Logout</Button>
            </div>
        </div>
    );
};

export default Header;