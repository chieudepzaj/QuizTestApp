import { signOut } from '@firebase/auth';
import { Menu, Dropdown } from 'antd';
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

const Navbar: React.FC = () => {
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

  const accountOptDropdown = (
    <Menu>
      <Menu.Item>
        <div onClick={handleSignOut}>Logout</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <img onClick={() => navigate(routePath.DASHBOARD)} className="navbar__logo" src={logoImg} alt="logo" />

      <div className="navbar__function">
        <div>{user.fullname}</div>
        <Dropdown overlay={accountOptDropdown} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <img className="account-icon" src={profileIcon} alt="logo" />
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;

//
// );

//   <Dropdown overlay={menu}>
//     <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
//       Hover me <DownOutlined />
//     </a>
//   </Dropdown>,
