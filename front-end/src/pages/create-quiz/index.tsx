import React, { useState } from 'react';
import Header from 'src/layouts/header';
import { Button, Form, Input } from 'antd';
import { REQUIRED_FIELD } from 'src/constants/messages';
import './style.scss';
import Papa from 'papaparse';
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';
import { queryAllByDisplayValue } from '@testing-library/dom';

const { TextArea } = Input;

interface IQuizQuestion {
  question: string;
  ans_1: string;
  ans_2: string;
  ans_3: string;
  ans_4: string;
  correct_ans: number;
}

const CreateQuiz = () => {
  const [csvfile, setCsvfile] = useState<any>();
  const [csvfileError, setCsvfileError] = useState(false);
  let quizData: IQuizQuestion[];

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
        complete: (result: any) => {
          try {
            const quesData = result.data.filter(
              (ques: IQuizQuestion) =>
                ques.question && ques.ans_1 && ques.ans_2 && ques.ans_3 && ques.ans_4 && ques.correct_ans,
            );
            console.log(values);
            console.log(quesData);
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
              <div className="profile-form__btn">
                <Button className={'sign-in-btn'} type="primary" htmlType="submit">
                  SAVE
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
