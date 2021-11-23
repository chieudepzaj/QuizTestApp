import React from 'react';
import classnames from 'classnames/bind';
import graduationIcon from 'src/assets/images/graduation_image.png';
import logoImg from 'src/assets/images/logo.png';
import { Button, Form, Input } from 'antd';

import { REQUIRED_FIELD } from 'src/constants/messages';
import stylesSCSS from './Login.module.scss';
import { PATTERN_VALIDATE_EMAIL } from 'src/helpers/regex';

const cx = classnames.bind(stylesSCSS);

const Login = () => {
  const onSubmit = async () => {
    // TODO
  };

  const onChangeEmail = () => { };

  const onChangePassword = () => { };

  return (
    <div className={cx('container')}>
      <div className={cx('form')}>
        <img src={logoImg} alt='logo-img' />

        <div className={cx('welcome-text')}>
          <span>Welcome  back!</span>
          <span>Please login/Signup to your account.</span>
        </div>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            emailAddress: '',
            password: '',
          }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email address"
            name="emailAddress"
            rules={[
              {
                required: true,
                message: REQUIRED_FIELD,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    /^[^[0-9]*$/.test(value) &&
                    /^[^@$#=(){}!^%\/~;*'"`?<>&\-_.,:\+\\\]\[/]*$/.test(value)
                  ) {
                    return Promise.resolve();
                  } else
                    return Promise.reject(
                      new Error(
                        "Sorry, number and special characters are not allowed."
                      )
                    );
                },
              }),
            ]}
          >
            <Input
              onChange={onChangeEmail}
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: REQUIRED_FIELD },
              {
                pattern: PATTERN_VALIDATE_EMAIL,
                message: "Please enter a correct email.",
              },
            ]}
          >
            <Input
              onChange={onChangePassword}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className={cx('action')}>
            <Button className={cx('sign-in-btn')} type="primary" htmlType="submit">
              Sign In
            </Button>

            <Button className={cx('sign-up-btn')} type="primary">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={cx('image')}>
        <img src={graduationIcon} alt='graduation-icon' />
      </div>
    </div>);
};

export default Login;
