import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from 'src/layouts/header';
import './styles.scss';
import quizImg from 'src/assets/images/quiz.png';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IQuizInfo } from 'src/interfaces';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from 'src/firebase/firebase';
import { DbsName } from 'src/constants/db';
import { handleTakeQuiz } from 'src/store/currentQuiz';
import Cookies from 'js-cookie';
import { cookieName } from 'src/constants/cookieNameVar';
import { secondsToTime } from 'src/helpers/indes';
import { doc, deleteDoc } from "firebase/firestore";
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';

const ManageTest: React.FC = () => {
  const user = useAppSelector((user) => user.account.user);
  const dispatch = useAppDispatch();
  const [allQuiz, setAllQuiz] = useState<IQuizInfo[]>([]);

  const getAllQuiz = async () => {
    try {
      const allQuizSnapshot = await getDocs(query(collection(db, DbsName.QUIZ)));

      const allQuizDoc: IQuizInfo[] = [];
      allQuizSnapshot.forEach((doc: any) => {
        const docData = doc.data();
        docData.lastModify = docData.lastModify.toDate();

        allQuizDoc.push({
          id: doc.id,
          ...docData,
        });
      });

      allQuizDoc.sort((a: IQuizInfo, b: IQuizInfo) => b.lastModify.getTime() - a.lastModify.getTime());

      setAllQuiz(allQuizDoc);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.accessToken) {
      getAllQuiz();
    }
  }, [user]);

  useEffect(() => {
    const currentQuiz = Cookies.get(cookieName.CURRENT_QUIZ);
    if (currentQuiz) {
      dispatch(handleTakeQuiz(JSON.parse(currentQuiz)));
    }
  }, []);

  const handleOnDeleteQuiz = async (quiz: any) => {
    try {
      const allQuizQuesSnapshot = await getDocs(
        query(collection(db, DbsName.QUESTION), where('quizID', '==', quiz.id)),
      );
      allQuizQuesSnapshot.forEach((ques) => {
        deleteDoc(doc(db, DbsName.QUESTION, ques.id));
      });

      deleteDoc(doc(db, DbsName.QUIZ, quiz.id));

      setAllQuiz(allQuiz.filter(quizE => quizE.id !== quiz.id));

      openCustomNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Delete quiz successfully', '');
    } catch (error: any) {
      console.error(error);
    }
  };

  const QuizInfo: React.FC<{
    quiz: IQuizInfo;
  }> = (props) => {
    const { quiz } = props;
    const timeLimit = secondsToTime(quiz.timeLimit * 60 * 60);

    return (
      <div className="quiz-info-container">
        <div className="quiz-info">
          <img className="quizImage" src={quizImg} alt="logo" />

          <div className="quiz-info__text">
            <span className="quiz-info__title">{quiz.name}</span>
            <span className="ques-info-box">
              <span className="ques-info-label">Number of questions</span>
              <span className="ques-info-text">{quiz.numberOfQuestion}</span>
            </span>
            <span className="ques-info-box">
              <span className="ques-info-label">Time limit</span>
              <span className="ques-info-text">
                {timeLimit.hours}h {timeLimit.minutes}m {timeLimit.seconds}s
              </span>
            </span>
            <span className="ques-info-box">
              <span className="ques-info-label">Last modify</span>
              <span
                className="ques-info-text"
                style={{
                  display: 'block',
                }}
              >
                {quiz.lastModify.toString()}
              </span>
            </span>
            <span>
              <span className="ques-info-label">Description</span>
            </span>
            <span className="quiz-description  ques-info-box">{quiz.description}</span>
          </div>
        </div>

        <div className="action-container">
          <div>
            <Button onClick={() => handleOnDeleteQuiz(quiz)}>Delete Quiz</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />

      <div className="manage-test__container">
        <div className="all-quiz-info-container">
          <div className="title">TOTAL QUIZ: {allQuiz.length}</div>
          {allQuiz.map((quiz, index) => {
            return <QuizInfo key={index} quiz={quiz} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ManageTest;
