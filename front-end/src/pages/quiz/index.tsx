import { collection, getDocs, query, where } from '@firebase/firestore';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { cookieName } from 'src/constants/cookieNameVar';
import { DbsName } from 'src/constants/db';
import routePath from 'src/constants/routePath';
import { db } from 'src/firebase/firebase';
import { IQuizInfo, IQuizQuestion } from 'src/interfaces';
import Header from 'src/layouts/header';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import './styles.scss';

const getAllQuestions: any = async (quiz: any) =>
  (async (quiz) => {
    try {
      const allQuesDoc: IQuizQuestion[] = [];
      const allQuesSnapshot = await getDocs(query(collection(db, DbsName.QUESTION), where('quizID', '==', quiz.id)));

      allQuesSnapshot.forEach((doc: any) => {
        allQuesDoc.push({
          id: doc.id,
          ...doc.data(),
          correct_ans: undefined,
        });
      });

      return allQuesDoc;
    } catch (error: any) {
      console.error(error);
    }
  })(quiz);

const Quiz: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);
  const quiz: IQuizInfo = useAppSelector((state) => state.quiz.quiz);
  const [allQues, setAllQues] = useState<IQuizQuestion[]>([]);
  const [currentQues, setCurrentQuest] = useState(0);
  const [currentAns, setCurrentAns] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get(cookieName.CURRENT_ANSWER)) {
      const ans: any = Cookies.get(cookieName.CURRENT_ANSWER)?.split(',');
      if (ans) {
        for (let i = 0; i < ans.length; i++) {
          ans[i] = Number(ans[i]);
        }

        setCurrentAns(ans);
      }
    }
  }, []);

  useEffect(() => {
    if (quiz.id) {
      const getQuesState = async () => {
        const ques = await getAllQuestions(quiz);
        if (ques) setAllQues(ques);
      };

      getQuesState();
    }
  }, [quiz]);

  const setAns = (ans: number) => {
    setCurrentAns((prev) => {
      const newArray = [...prev];
      newArray[currentQues] = ans;
      Cookies.set(cookieName.CURRENT_ANSWER, newArray.toString());
      return newArray;
    });
  };

  return (
    <>
      {user.accessToken && !user.fullname && <Navigate to={routePath.PROFILE} />}
      {(!quiz || !quiz.name || !Cookies.get(cookieName.CURRENT_QUIZ)) && <Navigate to={routePath.TAKE_QUIZ} />}

      <Header />
      {allQues.length > 0 && (
        <>
          <div className="test__current">
            <div className="text">Current question:</div>
            <div className="counter">
              <div className="box">
                {currentQues + 1}/{quiz.numberOfQuestion}
              </div>
            </div>
          </div>
          <div className="test__quest-box">
            QUESTION {currentQues + 1}: {allQues[currentQues].question}
          </div>
          <br></br>
          <div className="test__answer-box">
            <div className="small-box">
              <Button className={currentAns[currentQues] === 1 ? 'user-answer' : ''} onClick={() => setAns(1)}>
                <div className="choice">A.</div>
                {allQues[currentQues].ans_1}
              </Button>
            </div>

            <div className="small-box">
              <Button className={currentAns[currentQues] === 2 ? 'user-answer' : ''} onClick={() => setAns(2)}>
                <div className="choice">B.</div>
                {allQues[currentQues].ans_2}
              </Button>
            </div>

            <div className="small-box">
              <Button className={currentAns[currentQues] === 3 ? 'user-answer' : ''} onClick={() => setAns(3)}>
                <div className="choice">C.</div>
                {allQues[currentQues].ans_3}
              </Button>
            </div>

            <div className="small-box">
              <Button className={currentAns[currentQues] === 4 ? 'user-answer' : ''} onClick={() => setAns(4)}>
                <div className="choice">D.</div>
                {allQues[currentQues].ans_4}
              </Button>
            </div>
          </div>
          <div className="test__navi-butt">
            <div className="butt-box">
              <Button disabled={currentQues === 0 ? true : false} onClick={() => setCurrentQuest((prev) => prev - 1)}>
                Previous
              </Button>
            </div>
            <div className="butt-box">
              <Button
                style={{
                  height: '9rem',
                  width: '9rem',
                  backgroundColor: 'green',
                  borderRadius: '50%',
                }}
              >
                SUBMIT
              </Button>
            </div>
            <div className="butt-box">
              <Button
                disabled={currentQues === allQues.length - 1 ? true : false}
                onClick={() => setCurrentQuest((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Quiz;
