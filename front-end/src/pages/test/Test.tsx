import { Button } from 'antd';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserRole } from 'src/constants/constants';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import { useAppSelector } from 'src/store/hooks';
import './styles.scss';

const Test: React.FC = () => {
  const user = useAppSelector((user) => user.account.user);
  const navigate = useNavigate();

  return (
    <>
      {user.accessToken && !user.fullname && <Navigate to={routePath.PROFILE} />}

      <Header />
      <div className="current">
        <div className="text">Current question:</div>
        <div className="counter">
          <div className="box">4/10</div>
        </div>
      </div>
      <div className='quest-box'>Hello Worldaaaaa vavuydciscusdctdscdcbhadcbsjhdv cgs tstdvtvdvcsdvcjhsvcjhsdgcyusdvucx cuyvuysdvcyuvdcyufu uycuygduycuyvucve</div>
      <br></br>
      <div className="answer-box">
          <div className="small-box">
              <div className="choice">A.</div>
              <Button onClick={() => navigate(routePath.TAKE_TEST)}>Choice A</Button>
          </div>
          <div className="small-box">
              <div className="choice">B.</div>
              <Button onClick={() => navigate(routePath.TAKE_TEST)}>Choice qtyuioasdfghjkcjvcsdckvscasusvuyadcohiubuyadge87dwsbifgB</Button> 
          </div>
          <div className="small-box">
                <div className="choice">C.</div>
                <Button onClick={() => navigate(routePath.TAKE_TEST)}>Choice C</Button>
          </div>
          <div className="small-box">
                <div className="choice">D.</div>
                <Button onClick={() => navigate(routePath.TAKE_TEST)}>Choice D</Button>
          </div>
      </div>
      <div className="navi-butt">
        <div className="butt-box"><Button onClick={() => navigate(routePath.TAKE_TEST)}>Previous</Button></div>
        <div className="butt-box"><Button>PlaceHolder</Button></div>
        <div className="butt-box"><Button onClick={() => navigate(routePath.TAKE_TEST)}>Next</Button></div>
      </div>
    </>
  );
};

export default Test;