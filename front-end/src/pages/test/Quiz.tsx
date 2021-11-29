import { Button } from 'antd';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserRole } from 'src/constants/constants';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import { useAppSelector } from 'src/store/hooks';
import './styles.scss';

const Quiz: React.FC = () => {
  const user = useAppSelector((user) => user.account.user);
  const navigate = useNavigate();

  return (
    <>
      {user.accessToken && !user.fullname && <Navigate to={routePath.PROFILE} />}

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
          <Button>Choice A</Button>
        </div>
        <div className="small-box">
          <div className="choice">B.</div>
          <Button>
            Choice qtyuioasdfghjkcjvcsdckvscasusvuyadcohiubuyadge87dwsbifgB
          </Button>
        </div>
        <div className="small-box">
          <div className="choice">C.</div>
          <Button>Choice C</Button>
        </div>
        <div className="small-box">
          <div className="choice">D.</div>
          <Button>Choice D</Button>
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
