import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
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
import { doc, deleteDoc } from 'firebase/firestore';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';
import { PlusCircleOutlined } from '@ant-design/icons';
import CreateQuiz from './components/create-quiz';
import QuizInfo from 'src/components/quiz-info';

const ManageTest: React.FC = () => {
  const user = useAppSelector((user) => user.account.user);
  const dispatch = useAppDispatch();
  const [allQuiz, setAllQuiz] = useState<IQuizInfo[]>([]);
  const [isOpenCreateNewQuizModal, setIsOpenCreateNewQuizModal] = useState(false);

  const getAllQuiz = async () => {
    try {
      const allQuizSnapshot = await getDocs(query(collection(db, DbsName.QUIZ), where('classID', '==', user.classID)));

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

      setAllQuiz(allQuiz.filter((quizE) => quizE.id !== quiz.id));

      openCustomNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Delete quiz successfully', '');
    } catch (error: any) {
      openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Delete quiz failed', '');
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleOnEditQuiz = (quiz: any) => {};

  const handleOnViewQuizResult = (quiz: any) => {};

  return (
    <div className="manage-test__container">
      <div className="all-quiz-info-container">
        <Button className="add-quiz" onClick={() => setIsOpenCreateNewQuizModal(true)}>
          Add new quiz <PlusCircleOutlined />
        </Button>
        <div className="title">Total quiz: {allQuiz.length}</div>
        {allQuiz.map((quiz, index) => {
          return (
            <QuizInfo
              key={index}
              quiz={quiz}
              actions={[
                <Button key="quiz-result" className="result-btn" onClick={() => handleOnViewQuizResult(quiz)}>
                  Quiz Results
                </Button>,
                <Button key="edit-quiz" className="edit-btn" onClick={() => handleOnEditQuiz(quiz)}>
                  Edit Quiz
                </Button>,
                <Button key="delete-quiz" className="del-btn" onClick={() => handleOnDeleteQuiz(quiz)}>
                  Delete Quiz
                </Button>,
              ]}
            />
          );
        })}
      </div>

      <CreateQuiz visible={isOpenCreateNewQuizModal} setIsOpenCreateNewQuizModal={setIsOpenCreateNewQuizModal} />
    </div>
  );
};

export default ManageTest;
