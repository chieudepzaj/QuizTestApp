import { Button } from 'antd';
import React from 'react';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import './styles.scss';
import quizImg from 'src/assets/images/quiz.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserRole } from 'src/constants/constants';
import { useAppSelector } from 'src/store/hooks';

const TakeTest: React.FC = () => {
  const user = useAppSelector((user) => user.account.user);
  const navigate = useNavigate();
  return <>
    <Header />

    <div className='take-test__container'>
      <div className='title new-quiz-title'>NEW TEST!</div>

      <div className='new-quiz-info-container'>
        <div className='new-quiz-info'>
          <img className="quizImage" src={quizImg} alt="logo" />

          <div className='new-quiz-info__text'>
            <span>Name: Life</span>
            <span>Level: Easy</span>
            <span>Number of questions: 20</span>
          </div>
        </div>

        <div className='action-container'>
          <Button onClick={() => navigate(routePath.TEST)}>Start Quiz</Button>
        </div>
      </div>

      {/* <hr style={{
        marginTop: '3rem',
        width: '50%'
      }} /> */}

      <div className='title other-quiz-title'>OTHER QUIZZES</div>

      <div className='all-quiz-info-container'>
        <img className="quizImage" src={quizImg} alt="logo" />
        <img className="quizImage" src={quizImg} alt="logo" />
        <img className="quizImage" src={quizImg} alt="logo" />
        <img className="quizImage" src={quizImg} alt="logo" />
        <img className="quizImage" src={quizImg} alt="logo" />
        <img className="quizImage" src={quizImg} alt="logo" />
        <img className="quizImage" src={quizImg} alt="logo" />
        <img className="quizImage" src={quizImg} alt="logo" />
        <img className="quizImage" src={quizImg} alt="logo" />
      </div>
    </div>
  </>;
};

export default TakeTest;
