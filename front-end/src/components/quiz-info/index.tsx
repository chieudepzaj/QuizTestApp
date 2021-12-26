import React, { ReactNode } from 'react';
import { secondsToTime } from 'src/helpers/indes';
import { IQuizInfo, IQuizResult } from 'src/interfaces';
import './styles.scss';
import quizImg from 'src/assets/images/quiz.png';

export type UserQuizInfo = IQuizInfo & {
  userResult?: IQuizResult;
};

const QuizInfo: React.FC<{
  quiz: UserQuizInfo;
  actions: ReactNode[];
}> = (props) => {
  const { quiz, actions } = props;
  const timeLimit = secondsToTime(quiz.timeLimit);

  return (
    <div className="quiz-info-container">
      <div className="quiz-info">
        <img className="quizImage" src={quizImg} alt="logo" />

        <div className="quiz-info__text">
          <span className="quiz-info__title">{quiz.name}</span>
          <span className="ques-info-box">
            <span className="ques-info-label">Number of questions</span>
            <span className="ques-info-text">{quiz.numberOfQuestion}</span>
          </span>
          <span className="ques-info-box">
            <span className="ques-info-label">Time limit</span>
            <span className="ques-info-text">
              {timeLimit.hours}h {timeLimit.minutes}m {timeLimit.seconds}s
            </span>
          </span>
          <span className="ques-info-box">
            <span className="ques-info-label">Last modify</span>
            <span
              className="ques-info-text"
              style={{
                display: 'block',
              }}
            >
              {quiz.lastModify.toString()}
            </span>
          </span>
          <span>
            <span className="ques-info-label">Description</span>
          </span>
          <span className="quiz-description  ques-info-box">{quiz.description}</span>
        </div>
      </div>

      <div className="action-container">
        <div>{actions}</div>
      </div>
    </div>
  );
};

export default QuizInfo;
