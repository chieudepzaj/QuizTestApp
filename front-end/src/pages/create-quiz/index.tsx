import React, { useState } from 'react';
import Header from 'src/layouts/header';
import { Button, Form, Input } from 'antd';
import { REQUIRED_FIELD } from 'src/constants/messages';
import './style.scss';
import Papa from 'papaparse';
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { db } from 'src/firebase/firebase';
import { DbsName } from 'src/constants/db';
import { IQuizInfo, IQuizQuestion } from 'src/interfaces';
import { useAppSelector } from 'src/store/hooks';

const { TextArea } = Input;

const CreateQuiz: React.FC = () => {
  const [csvfile, setCsvfile] = useState<any>();
  const [csvfileError, setCsvfileError] = useState(false);
  const user = useAppSelector((state) => state.account.user);

  const handleUploadChange = (event: any) => {
    try {
      setCsvfile(event.target.files[0]);
      if (event.target.files[0]) setCsvfileError(false);
    } catch (error: any) {
      setCsvfile(undefined);
    }
  };

  const handleOnCreateQuiz = async (values: any) => {
    if (!csvfile) {
      setCsvfileError(true);
      return;
    }

    try {
      await Papa.parse(csvfile, {
        complete: async (result: any) => {
          try {
            const quesData: IQuizQuestion[] = result.data.filter(
              (ques: IQuizQuestion) =>
                ques.question && ques.ans_1 && ques.ans_2 && ques.ans_3 && ques.ans_4 && ques.correct_ans,
            );

            const newQuizInfo: IQuizInfo = {
              name: values.quizName,
              numberOfQuestion: quesData.length,
              description: values.description,
              classID: user.classID,
              timeLimit: values.timeLimit,
              lastModify: new Date(),
            };

            const newQuizDocRef = await addDoc(collection(db, DbsName.QUIZ), newQuizInfo);
            const quizID = newQuizDocRef.id;

            quesData.forEach(async (ques: IQuizQuestion) => {
              await addDoc(collection(db, DbsName.QUESTION), {
                ...ques,
                quizID,
              });
            });

            openCustomNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Create new quiz successfully', '');
          } catch (error: any) {
            openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Error in creating new quiz', '');
          }
        },
        header: true,
      });
    } catch (error: any) {
      openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'File uploaded error', 'Please upload file onece again');
    }
  };

  return (
    <>
      <Header />

      <div className={'create-quiz-container'}>
        <div className={'create-quiz-form'}>
          <div className={'form__title'}>CREATE QUIZ</div>

          <Form
            name="create-quiz"
            initialValues={{
              quizName: '',
              description: '',
              timeLimit: 0,
            }}
            onFinish={handleOnCreateQuiz}
            autoComplete="off"
          >
            <Form.Item label="Quiz name" name="quizName" rules={[{ required: true, message: REQUIRED_FIELD }]}>
              <Input onChange={() => {}} placeholder="Quiz name" />
            </Form.Item>

            <label
              style={{
                fontSize: '1.9rem',
              }}
            >
              Upload CSV File here
            </label>
            <div className="upload-csv-file">
              <input
                className="csv-input"
                id="import-csv"
                type="file"
                // ref={input => {
                //     console.log(input);
                // }}
                // name="file"
                onChange={handleUploadChange}
              />
              <label htmlFor="import-csv" className="import-csv-label">
                <span className="import-csv__button">
                  <UploadOutlined className="import-icon" />
                  Click to import CSV file
                </span>
                <span>
                  {csvfile ? (
                    <>
                      <PaperClipOutlined /> {csvfile.name}
                    </>
                  ) : (
                    'No file are selected'
                  )}
                </span>
              </label>
              {csvfileError && <div className="error-text">Please upload csv file</div>}
            </div>

            <Form.Item
              label="Time limit (hour)"
              name="timeLimit"
              rules={[
                { required: true, message: REQUIRED_FIELD },
                (
                  {
                    //  getFieldValue
                  },
                ) => ({
                  validator(_, value) {
                    if (value > 0) {
                      return Promise.resolve();
                    } else return Promise.reject(new Error('Time limit must greater than 0.'));
                  },
                }),
              ]}
            >
              <Input type="number" onChange={() => {}} placeholder="Time limit (hour)" />
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: true, message: REQUIRED_FIELD }]}>
              <TextArea onChange={() => {}} placeholder="Quiz name" />
            </Form.Item>

            <Form.Item className={'action'}>
              <div className="create-quiz-form__btn">
                <Button className={'save-btn'} type="primary" htmlType="submit">
                  CREATE NEW QUIZ
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
