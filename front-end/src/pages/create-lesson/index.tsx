import React, { useState } from 'react';
import Navbar from 'src/layouts/nav-bar';
import { Button, Form, Input } from 'antd';
import { REQUIRED_FIELD } from 'src/constants/messages';
import './style.scss';
import Papa from 'papaparse';
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';
import { addDoc, collection } from '@firebase/firestore';
import { db } from 'src/firebase/firebase';
import { DbsName } from 'src/constants/db';
import { IQuizInfo, IQuizQuestion, ILessonInfo } from 'src/interfaces';
import { useAppSelector } from 'src/store/hooks';

const { TextArea } = Input;

const CreateLesson: React.FC = () => {
  const user = useAppSelector((state) => state.account.user);

  const handleOnCreateLesson = async (values: any) => {
          try {

            const newLessonInfo: ILessonInfo = {
                lessonName: values.lessonName,
                content: values.content,
                linkYT: values.linkYT,
                classID: user.classID,
                lastModify: new Date(),
            };

            const newLessonDocRef = await addDoc(collection(db, DbsName.LESSON), newLessonInfo);

            openCustomNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Create new lesson successfully', '');
          } catch (error: any) {
            openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Error in creating new lesson', '');
          }
    
  };

  return (
    <>
      <div className={'create-lesson-container'}>
        <div className={'create-lesson-form'}>
          <div className={'form__title'}>CREATE LESSON</div>

          <Form
            name="create-lesson"
            initialValues={{
              lessonName: '',
              content: '',
              linkYT: '',
            }}
            onFinish={handleOnCreateLesson}
            autoComplete="off"
          >
            <Form.Item label="Lesson name" name="lessonName" rules={[{ required: true, message: REQUIRED_FIELD }]}>
              <Input onChange={() => {}} placeholder="Lesson name" />
            </Form.Item>

            <Form.Item label="Youtube link" name="linkYT" rules={[{ required: true, message: REQUIRED_FIELD }]}>
              <Input onChange={() => {}} placeholder="URL" />
            </Form.Item>

            <Form.Item label="Content" name="content" rules={[{ required: true, message: REQUIRED_FIELD }]}>
                <textarea onChange={() => {}} placeholder="Please write something..." ></textarea>
            </Form.Item>

            <Form.Item className={'action'}>
              <div className="create-lesson-form__btn">
                <Button className={'save-btn'} type="primary" htmlType="submit">
                  CREATE NEW LESSON
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateLesson;
