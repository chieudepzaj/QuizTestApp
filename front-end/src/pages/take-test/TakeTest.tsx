import { Button } from 'antd';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserRole } from 'src/constants/constants';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import './styles.scss';
import quizImg from 'src/assets/images/quiz.png';
import { useAppSelector } from 'src/store/hooks';


const TakeTest: React.FC = () => {
  return <>
  <Header />
  <div className='container'>
    <div className='label'>New:</div>
    <br></br>
    <div className='box'>
      <img className="container__quizImage" src={quizImg} alt="logo" />
      <div className='box-text'>Hello World</div>
    </div>
    <br></br>
    <div className='box'>Hello</div>
  </div>
  </>;
};

export default TakeTest;
