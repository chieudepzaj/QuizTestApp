/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from 'antd/lib/modal/Modal';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { UserQuizInfo } from 'src/components/quiz-info';
import { DbsName } from 'src/constants/db';
import { db } from 'src/firebase/firebase';
import correctIcon from 'src/assets/icons/correct-icon.png';
import wrongIcon from 'src/assets/icons/wrong-icon.png';
import './styles.scss';

const QuizResult: React.FC<{
  visible: boolean;
  setIsOpenQuizResultModal: React.Dispatch<React.SetStateAction<boolean>>;
  quiz: UserQuizInfo;
}> = ({ visible, setIsOpenQuizResultModal, quiz }) => {
  const [resultDetails, setResultDetails] = useState<any[]>([]);

  useEffect(() => {
    const getResultDetails = async () => {
      const resultDetailsTmp: any[] = [];

      if (quiz && quiz?.userResult) {
        await Promise.all(
          quiz?.userResult?.resultDetails.map(async (el) => {
            const resultDocRef = await doc(db, DbsName.QUESTION, el.quesID);
            const resultDocSnap = await getDoc(resultDocRef);

            resultDetailsTmp.push({
              correct: el.correct,
              quesDetails: resultDocSnap.data(),
            });
          }),
        );
      }

      setResultDetails(resultDetailsTmp);
    };

    getResultDetails();
  }, [quiz]);

  return (
    <Modal
      visible={visible}
      onCancel={() => setIsOpenQuizResultModal(false)}
      className="quiz-result-modal"
      title={<div className={'form__title'}>RESULT</div>}
      // closeIcon={hideModal && <img onClick={hideModal} src={CloseIcon} alt="close-icon" />}
      width={'60rem'}
      maskClosable={false}
      // description={description}
      closable={true}
      confirmLoading={true}
      centered={true}
      footer={<></>}
    >
      {resultDetails.map((el) => {
        const correctAnswer =
          el.quesDetails.correct_ans === 1
            ? el.quesDetails.ans_1
            : el.quesDetails.correct_ans === 1
            ? el.quesDetails.ans_1
            : el.quesDetails.correct_ans === 1
            ? el.quesDetails.ans_1
            : el.quesDetails.ans_1;

        return (
          <>
            <div>
              <span>Question: {el.quesDetails.question}</span>
            </div>
            <div>
              <span>Correct answer: {correctAnswer}</span>
              <span>
                <img className="icon" src={el.correct ? correctIcon : wrongIcon} alt={el.correct} />
              </span>
            </div>
          </>
        );
      })}
    </Modal>
  );
};

export default QuizResult;
