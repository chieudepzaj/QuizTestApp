import React from 'react';
import Header from 'src/layouts/header';
import { Upload, TimePicker, Button, Form, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { REQUIRED_FIELD } from 'src/constants/messages';
import './style.scss';
import Papa from 'papaparse';

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
    let csvfile: any;
    let quizData: IQuizQuestion[];

    const handleUploadChange = (event: any) => {
        try {
            csvfile = event.target.files[0];
        } catch (error: any) {
            csvfile = undefined;
        }
    };

    const handleOnCreateQuiz = async (values: any) => {
        await Papa.parse(csvfile, {
            complete: (result: any) => {
                console.log(values);
                console.log(result.data);
            },
            header: true,
        });
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
                            <Input onChange={() => { }} placeholder="Quiz name" />
                        </Form.Item>

                        <label style={{
                            fontSize: '1.9rem',
                        }}>Upload CSV File here</label>
                        <div className="upload-csv-file">
                            <input
                                className="csv-input"
                                type="file"
                                // ref={input => {
                                //     console.log(input);
                                // }}
                                // name="file"
                                onChange={handleUploadChange}
                            />
                        </div>

                        <Form.Item label="Time limit (hour)" name="timeLimit" rules={[{ required: true, message: REQUIRED_FIELD }]}>
                            <Input type="number" onChange={() => { }} placeholder="Time limit (hour)" />
                        </Form.Item>

                        <Form.Item label="Description" name="description" rules={[{ required: true, message: REQUIRED_FIELD }]}>
                            <TextArea onChange={() => { }} placeholder="Quiz name" />
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
