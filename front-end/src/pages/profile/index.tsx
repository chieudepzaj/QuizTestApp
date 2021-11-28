import React, { useEffect, useState } from 'react';
import { doc, getDocs, updateDoc } from 'firebase/firestore';
import { Button, Form, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useNavigate } from 'react-router-dom';

import { REQUIRED_FIELD } from 'src/constants/messages';
import { classesRef, db } from 'src/firebase/firebase';
import routePath from 'src/constants/routePath';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';

import './styles.scss';
import { UserRole } from 'src/constants/constants';
import { DbsName } from 'src/constants/db';
import { updateUserInfo } from 'src/store/auth';

const { Option } = Select;

const Profile = () => {
  const user = useAppSelector((state) => state.account.user);
  const [provideProfile, setProvideProfile] = useState(user.fullname ? false : true);
  const [classes, setClasses] = useState<{ label: string; value: string }[]>([]);
  const [viewMode, setViewMode] = useState(!provideProfile);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getClasses = async () => {
      const docSnap = await getDocs(classesRef);
      const classesData: any[] = [];
      docSnap.forEach((doc) => {
        classesData.push({
          label: doc.data().name,
          value: doc.id,
        });
      });
      setClasses(classesData);
    };
    getClasses();
  }, []);

  const onSubmit = async (values: any) => {
    try {
      const userInfo = { ...values };

      const userInfoDocRef = await doc(db, DbsName.USER, user.uid);

      await updateDoc(userInfoDocRef, userInfo);
      openCustomNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Update profile successfully', '');
      dispatch(updateUserInfo(userInfo));
      navigate(routePath.DASHBOARD);
    } catch (err) {
      console.error(err);
      openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Error in updating profile', '');
    }
  };

  return (
    <>
      <div className={'profile-container'}>
        <div className={'profile-form'}>
          {provideProfile ||
            (editMode && (
              <>
                <div className={'profile-form__title'}>
                  {provideProfile ? (
                    <span>Please provide your info to continue</span>
                  ) : (
                    <span>Hi, {user.fullname}</span>
                  )}
                </div>

                <Form
                  name="profile"
                  initialValues={{
                    fullname: '',
                    classID: '',
                  }}
                  onFinish={onSubmit}
                  autoComplete="off"
                >
                  <Form.Item label="Full name" name="fullname" rules={[{ required: true, message: REQUIRED_FIELD }]}>
                    <Input onChange={() => {}} placeholder="Full name" />
                  </Form.Item>

                  {user.role === UserRole.STUDENT && (
                    <Form.Item label="Class" name="classID" rules={[{ required: true, message: REQUIRED_FIELD }]}>
                      <Select
                        showSearch
                        placeholder="Select your class"
                        optionFilterProp="children"
                        onChange={() => {}}
                        onFocus={() => {}}
                        onBlur={() => {}}
                        onSearch={() => {}}
                        // filterOption={(input, option: any) =>
                        //     option.children.toLowerCPase().indexOf(input.toLowerCase()) >= 0
                        // }
                      >
                        {classes.map((classE) => (
                          <Option key={classE.value} value={classE.value}>
                            {classE.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}

                  <Form.Item className={'action'}>
                    <Button className={'sign-in-btn'} type="primary" htmlType="submit">
                      SAVE
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ))}

          {viewMode && (
            <>
              <div className={'profile-form__title'}>
                <span>Hi, {user.fullname}</span>
              </div>

              <div>
                <span className="profile-form__label">Full name:</span> {user.fullname}
              </div>
              <div>
                <span className="profile-form__label">Email:</span> {user.email}
              </div>
              <div>
                <span className="profile-form__label">Class:</span>
                {classes.find((classInfo) => classInfo.value === user.classID)?.label}
              </div>

              <Button className={'sign-up-btn'} type="primary" onClick={() => navigate(routePath.DASHBOARD)}>
                BACK TO HOME PAGE
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
