import { Button } from 'antd';
import React from 'react';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import './styles.scss';
import quizImg from 'src/assets/images/quiz.png';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';

const TakeQuiz: React.FC = () => {
  const user = useAppSelector((user) => user.account.user);
  const navigate = useNavigate();

  const QuizInfo = (props: any) => {
    const { info, quizState } = props;

    return (
      <div className="quiz-info-container">
        <div className="quiz-info">
          <img className="quizImage" src={quizImg} alt="logo" />

          <div className="quiz-info__text">
            <span className="quiz-info__title">{info.name}</span>
            <span>
              <strong>Number of questions:</strong> {info.numberOfQuestion}
            </span>
            <span>
              <strong>Description</strong>
            </span>
            <span>{info.description}</span>
          </div>
        </div>

        <div className="action-container">
          <Button onClick={() => navigate(routePath.QUIZ)}>Start Quiz</Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />

      <div className="take-test__container">
        <div className="title new-quiz-title">NEW TEST!</div>

        <QuizInfo
          info={{
            name: 'new quiz',
            level: 'easy',
            numberOfQuestion: 20,
            description: 'new quiz',
          }}
        />

        <div className="title other-quiz-title">OTHER QUIZZES</div>

        <div className="all-quiz-info-container">
          <QuizInfo
            info={{
              name: 'new quiz',
              level: 'easy',
              numberOfQuestion: 20,
              description: 'new quiz',
            }}
          />
          <QuizInfo
            info={{
              name: 'new quiz',
              level: 'easy',
              numberOfQuestion: 20,
              description: 'new quiz',
            }}
          />
          <QuizInfo
            info={{
              name: 'new quiz',
              level: 'easy',
              numberOfQuestion: 20,
              description: 'new quiz',
            }}
          />
          <QuizInfo
            info={{
              name: 'new quiz',
              level: 'easy',
              numberOfQuestion: 20,
              description: 'new quiz',
            }}
          />
          <QuizInfo
            info={{
              name: 'new quiz',
              level: 'easy',
              numberOfQuestion: 20,
              description: 'new quiz',
            }}
          />
          <QuizInfo
            info={{
              name: 'new quiz',
              level: 'easy',
              numberOfQuestion: 20,
              description: 'new quiz',
            }}
          />
          <QuizInfo
            info={{
              name: 'new quiz',
              level: 'easy',
              numberOfQuestion: 20,
              description: 'new quiz',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TakeQuiz;
