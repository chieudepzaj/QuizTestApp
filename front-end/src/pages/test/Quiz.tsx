import { collection, getDocs, query, where } from '@firebase/firestore';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DbsName } from 'src/constants/db';
import routePath from 'src/constants/routePath';
import { db } from 'src/firebase/firebase';
import { IQuizQuestion } from 'src/interfaces';
import Header from 'src/layouts/header';
import { useAppSelector } from 'src/store/hooks';
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
  const user = useAppSelector((state) => state.account.user);
  const quiz = useAppSelector((state) => state.quiz.quiz);
  const [allQues, setAllQues] = useState<IQuizQuestion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (quiz.id) {
      const getQuesState = async () => {
        const ques = await getAllQuestions(quiz);
        if (ques) setAllQues(ques);
      };

      getQuesState();
    }
  }, [quiz]);

  return (
    <>
      {user.accessToken && !user.fullname && <Navigate to={routePath.PROFILE} />}
      {!quiz || (!quiz.name && <Navigate to={routePath.TAKE_QUIZ} />)};
      <Header />
      <div className="test__current">
        <div className="text">Current question:</div>
        <div className="counter">
          <div className="box">4/10</div>
        </div>
      </div>
      <div className="test__quest-box">
        Hello Worldaaaaa vavuydciscusdctdscdcbhadcbsjhdv cgs tstdvtvdvcsdvcjhsvcjhsdgcyusdvucx cuyvuysdvcyuvdcyufu
        uycuygduycuyvucve
      </div>
      <br></br>
      <div className="test__answer-box">
        <div className="small-box">
          <div className="choice">A.</div>
          <Button onClick={() => navigate(routePath.TAKE_QUIZ)}>Choice A</Button>
        </div>
        <div className="small-box">
          <div className="choice">B.</div>
          <Button onClick={() => navigate(routePath.TAKE_QUIZ)}>
            Choice qtyuioasdfghjkcjvcsdckvscasusvuyadcohiubuyadge87dwsbifgB
          </Button>
        </div>
        <div className="small-box">
          <div className="choice">C.</div>
          <Button onClick={() => navigate(routePath.TAKE_QUIZ)}>Choice C</Button>
        </div>
        <div className="small-box">
          <div className="choice">D.</div>
          <Button onClick={() => navigate(routePath.TAKE_QUIZ)}>Choice D</Button>
        </div>
      </div>
      <div className="test__navi-butt">
        <div className="butt-box">
          <Button onClick={() => navigate(routePath.TAKE_QUIZ)}>Previous</Button>
        </div>
        <div className="butt-box">
          <Button>PlaceHolder</Button>
        </div>
        <div className="butt-box">
          <Button onClick={() => navigate(routePath.TAKE_QUIZ)}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
