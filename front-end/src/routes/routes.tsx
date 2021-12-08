import routePath from 'src/constants/routePath';
import Login from 'src/pages/login';
import Dashboard from 'src/pages/dashboard';
import Profile from 'src/pages/profile';
import TakeQuiz from 'src/pages/take-quiz/TakeQuiz';
import CreateQuiz from 'src/pages/create-quiz';
import Quiz from 'src/pages/quiz';
import ChartStudent from 'src/pages/chart-student';
import Table from 'src/pages/manage';

const routers = {
  login: {
    exact: true,
    path: routePath.SIGN_IN,
    component: Login,
    private: false,
  },
  dashboard: {
    exact: true,
    path: routePath.DASHBOARD,
    component: Dashboard,
    private: true,
  },
  profile: {
    exact: true,
    path: routePath.PROFILE,
    component: Profile,
    private: true,
  },
  takeQuiz: {
    exact: true,
    path: routePath.TAKE_QUIZ,
    component: TakeQuiz,
    private: true,
  },
  createQuiz: {
    exact: true,
    path: routePath.CREATE_QUIZ,
    component: CreateQuiz,
    private: true,
  },
  quiz: {
    exact: true,
    path: routePath.QUIZ,
    component: Quiz,
    private: true,
  },
  chartStudent: {
    exact: true,
    path: routePath.CHART_STUDENT,
    component: ChartStudent,
    private: true,
  },
  Table: {
    exact: true,
    path: routePath.TABLE,
    component: Table,
    private: true,
  },
};

export default routers;
