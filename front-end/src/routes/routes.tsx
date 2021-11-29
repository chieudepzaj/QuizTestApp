import routePath from 'src/constants/routePath';
import Login from 'src/pages/login';
import Dashboard from 'src/pages/dashboard';
import Profile from 'src/pages/profile';
import TakeQuiz from 'src/pages/take-quiz/TakeQuiz';
import CreateQuiz from 'src/pages/create-quiz';

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
};

export default routers;
