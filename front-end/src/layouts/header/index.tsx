import { signOut } from '@firebase/auth';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import logoImg from 'src/assets/images/logo.png';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';
import routePath from 'src/constants/routePath';
import { auth } from 'src/firebase/firebase';
import { handleLogout } from 'src/store/auth';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import profileIcon from 'src/assets/icons/user-profile-icon.png';
import './styles.scss';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.account.user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(handleLogout({}));
      navigate(routePath.SIGN_IN);
    } catch (error: any) {
      openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Sign out failed', '');
    }
  };

  return (
    <div className="header">
      <img onClick={() => navigate(routePath.DASHBOARD)} className="header__logo" src={logoImg} alt="logo" />

      <div className="header__function">
        <img onClick={() => navigate(routePath.PROFILE)} src={profileIcon} alt="logo" />

        <div className="header__function__account-icon">Welcome, {user.fullname}</div>
        <Button onClick={handleSignOut}>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
