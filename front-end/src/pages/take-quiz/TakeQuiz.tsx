import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import routePath from 'src/constants/routePath';
import './styles.scss';
import quizImg from 'src/assets/images/quiz.png';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IQuizInfo, IQuizResult } from 'src/interfaces';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from 'src/firebase/firebase';
import { DbsName } from 'src/constants/db';
import { handleTakeQuiz } from 'src/store/currentQuiz';
import Cookies from 'js-cookie';
import { cookieName } from 'src/constants/cookieNameVar';
import { secondsToTime } from 'src/helpers/indes';

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

        const docData = doc.data();
        docData.lastModify = docData.lastModify.toDate();

        if (quizUserResult) {
          allQuizDoc.push({
            id: doc.id,
            ...docData,
            userResult: quizUserResult[0],
          });
        }
      });

      allQuizDoc.sort((a: UserQuizInfo, b: UserQuizInfo) => b.lastModify.getTime() - a.lastModify.getTime());

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
            <div className="result-text">
              Current result:
              <div className="result-text-score">
                {quiz.userResult?.score || quiz.userResult?.score === 0 ? quiz.userResult?.score : '--'}/
                {quiz.userResult?.totalScore ? quiz.userResult?.totalScore : '--'}
              </div>
            </div>
            <Button onClick={() => takeQuiz(quiz)}>Start Quiz</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {Cookies.get(cookieName.CURRENT_QUIZ) && <Navigate to={routePath.QUIZ} />}

      {allQuiz.length <= 0 && <div className="no-quiz-created">You have no quiz to do</div>}

      {allQuiz.length > 0 && (
        <div className="take-test__container">
          {allQuiz[0] && (
            <>
              <div className="title new-quiz-title">NEW QUIZ!</div>

              <QuizInfo quiz={allQuiz[0]} />
            </>
          )}

          {allQuiz.length > 1 && (
            <>
              <div className="title other-quiz-title">OTHER QUIZZES</div>

              <div className="all-quiz-info-container">
                {allQuiz.map((quiz, index) => {
                  if (index === 0) return;

                  return <QuizInfo key={index} quiz={quiz} />;
                })}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TakeQuiz;
