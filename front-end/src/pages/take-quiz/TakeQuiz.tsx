import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import './styles.scss';
import quizImg from 'src/assets/images/quiz.png';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IQuizInfo, IQuizResult } from 'src/interfaces';
import { collection, DocumentData, getDocs, Query, query, where } from '@firebase/firestore';
import { db } from 'src/firebase/firebase';
import { DbsName } from 'src/constants/db';
import { handleTakeQuiz } from 'src/store/currentQuiz';
import Cookies from 'js-cookie';
import { cookieName } from 'src/constants/cookieNameVar';

type UserQuizInfo = IQuizInfo & {
  userResult?: IQuizResult;
};

const TakeQuiz: React.FC = () => {
  const user = useAppSelector((user) => user.account.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [allQuiz, setAllQuiz] = useState<UserQuizInfo[]>([]);

  const getAllUserQuiz = async () => {
    try {
      /**
       * Get all user results
       */
      const allResultDoc: IQuizResult[] = [];
      const allResultSnapshot = await getDocs(query(collection(db, DbsName.RESULT), where('userID', '==', user.uid)));

      allResultSnapshot.forEach((doc: any) => {
        allResultDoc.push(doc.data());
      });

      /**
       * Get all quiz
       */
      const allQuizSnapshot = await getDocs(query(collection(db, DbsName.QUIZ), where('classID', '==', user.classID)));

      const allQuizDoc: UserQuizInfo[] = [];
      allQuizSnapshot.forEach((doc: any) => {
        const quizUserResult = allResultDoc.filter((result) => result.quizID === doc.id);

        if (quizUserResult) {
          allQuizDoc.push({
            id: doc.id,
            ...doc.data(),
            userResult: quizUserResult,
          });
        }
      });

      allQuizDoc.sort((a: UserQuizInfo, b: UserQuizInfo) => a.lastModify.getTime() - b.lastModify.getTime());

      setAllQuiz(allQuizDoc);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.accessToken) {
      getAllUserQuiz();
    }
  }, [user]);

  useEffect(() => {
    const currentQuiz = Cookies.get(cookieName.CURRENT_QUIZ);
    if (currentQuiz) {
      dispatch(handleTakeQuiz(JSON.parse(currentQuiz)));
    }
  });

  const takeQuiz = (quiz: UserQuizInfo) => {
    dispatch(handleTakeQuiz(quiz));
    navigate(routePath.QUIZ);
  };

  const QuizInfo: React.FC<{
    quiz: UserQuizInfo;
  }> = (props) => {
    const { quiz } = props;

    return (
      <div className="quiz-info-container">
        <div className="quiz-info">
          <img className="quizImage" src={quizImg} alt="logo" />

          <div className="quiz-info__text">
            <span className="quiz-info__title">{quiz.name}</span>
            <span className="ques-info-box">
              <span className="ques-info-label">Number of questions</span> {quiz.numberOfQuestion}
            </span>
            <span className="ques-info-box">
              <span className="ques-info-label">Time limit</span> {quiz.timeLimit}
            </span>
            <span className="ques-info-box">
              <span className="ques-info-label">Last modify</span>
              <span
                style={{
                  display: 'block',
                }}
              >
                {new Date(quiz.lastModify.seconds * 1000).toString()}
              </span>
            </span>
            <span>
              <span className="ques-info-label">Description</span>
            </span>
            <span className="quiz-description  ques-info-box">{quiz.description}</span>
          </div>
        </div>

        <div className="action-container">
          <Button onClick={() => takeQuiz(quiz)}>Start Quiz</Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {Cookies.get(cookieName.CURRENT_QUIZ) && <Navigate to={routePath.QUIZ} />}
      <Header />

      <div className="take-test__container">
        {allQuiz[0] && allQuiz[0].userResult && (
          <>
            <div className="title new-quiz-title">NEW QUIZ!</div>

            <QuizInfo quiz={allQuiz[0]} />
          </>
        )}

        <div className="title other-quiz-title">OTHER QUIZZES</div>

        <div className="all-quiz-info-container">
          {/* <QuizInfo
            quiz={}
          /> */}
        </div>
      </div>
    </>
  );
};

export default TakeQuiz;
