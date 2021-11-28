import React, { useState } from 'react';
import classnames from 'classnames/bind';
import graduationIcon from 'src/assets/images/graduation_image.png';
import logoImg from 'src/assets/images/logo.png';
import { Button, Form, Input } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppSelector } from 'src/store/hooks';

import { REQUIRED_FIELD } from 'src/constants/messages';
import stylesSCSS from './Login.module.scss';
import { PATTERN_VALIDATE_EMAIL } from 'src/helpers/regex';
import { auth } from 'src/firebase/firebase';
import { login } from 'src/store/auth';
import routePath from 'src/constants/routePath';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';
import { Navigate } from 'react-router-dom';

const cx = classnames.bind(stylesSCSS);

const Login = () => {
  const [actionType, setActionType] = useState(1); // 1-signIn, 2-signUp
  const user = useAppSelector((state) => state.account);

  const onSubmit = async (values: any) => {
    if (actionType === 1) {
      await login({ email: values.email, password: values.password });
    }

    if (actionType === 2) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          userCredential.user;
          openCustomNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Signed up successfully', '');
        })
        .catch((error) => {
          console.error(error.code, error.message);
          openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Signed up failed', '');
        });
    }
  };

  const onChangeEmail = () => {};

  const onChangePassword = () => {};

  return (
    <>
      {user.user.accessToken && <Navigate to={routePath.DASHBOARD} />}
      <div className={cx('container')}>
        <div className={cx('form')}>
          <img src={logoImg} alt="logo-img" />

          <div className={cx('welcome-text')}>
            <span>Welcome back!</span>
            <span>Please login/Signup to your account.</span>
          </div>

          <Form
            name="basic"
            initialValues={{
              emailAddress: '',
              password: '',
            }}
            onFinish={onSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                { required: true, message: REQUIRED_FIELD },
                {
                  pattern: PATTERN_VALIDATE_EMAIL,
                  message: 'Please enter a correct email.',
                },
              ]}
            >
              <Input onChange={onChangeEmail} placeholder="Email address" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: REQUIRED_FIELD,
                },
                (
                  {
                    //  getFieldValue
                  },
                ) => ({
                  validator(_, value) {
                    if (/^[^@$#=(){}!^%\/~;*'"`?<>&\-_.,:\+\\\]\[/]*$/.test(value)) {
                      return Promise.resolve();
                    } else return Promise.reject(new Error('Sorry, number and special characters are not allowed.'));
                  },
                }),
                (
                  {
                    // getFieldValue
                  },
                ) => ({
                  validator(_, value) {
                    if (value.length >= 6) {
                      return Promise.resolve();
                    } else return Promise.reject(new Error('Password should be at least 6 characters.'));
                  },
                }),
              ]}
            >
              <Input onChange={onChangePassword} placeholder="Password" />
            </Form.Item>

            <Form.Item className={cx('action')}>
              {actionType === 1 ? (
                <>
                  <Button className={cx('sign-in-btn')} type="primary" htmlType="submit">
                    Sign In
                  </Button>
                  <div className={cx('login-signup-text')} onClick={() => setActionType(2)}>
                    Click here to <span>SIGN UP!</span>
                  </div>
                </>
              ) : (
                <>
                  <Button className={cx('sign-up-btn')} type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                  <div className={cx('login-signup-text')} onClick={() => setActionType(1)}>
                    Click here to <span>LOG IN!</span>
                  </div>
                </>
              )}
            </Form.Item>
          </Form>
        </div>
        <div className={cx('image')}>
          <img src={graduationIcon} alt="graduation-icon" />
        </div>
      </div>
    </>
  );
};

export default Login;
