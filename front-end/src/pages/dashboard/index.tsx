import { Button } from 'antd';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserRole } from 'src/constants/constants';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import { useAppSelector } from 'src/store/hooks';

import './styles.scss';

const Dashboard: React.FC = () => {
  const user = useAppSelector((user) => user.account.user);
  const navigate = useNavigate();

  return (
    <>
      {user.accessToken && !user.fullname && <Navigate to={routePath.PROFILE} />}

      <Header />
      <div className="dashboard">
        {user.role === UserRole.TEACHER && (
          <>
            <Button onClick={() => navigate(routePath.CREATE_QUIZ)}>CREATE NEW QUIZ</Button>
            <Button onClick={() => navigate(routePath.MANAGE_TEST)}>MANAGE QUIZ</Button>
            <Button>MANAGE CLASS</Button>
          </>
        )}

        {user.role === UserRole.STUDENT && (
          <>
            <Button onClick={() => navigate(routePath.TAKE_QUIZ)}>TAKE TEST</Button>
            <Button onClick={() => navigate(routePath.CHART_STUDENT)}>TESTING RESULT</Button>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
