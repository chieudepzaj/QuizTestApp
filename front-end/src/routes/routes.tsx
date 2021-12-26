import routePath from 'src/constants/routePath';
import Login from 'src/pages/login';
// import Dashboard from 'src/pages/dashboard';
import Profile from 'src/pages/profile';
import TakeQuiz from 'src/pages/take-quiz/TakeQuiz';
import Quiz from 'src/pages/quiz';
import ChartStudent from 'src/pages/chart-student';
import ManageTest from 'src/pages/manageTest';
import ManageClass from 'src/pages/manageClass';
import CreateLesson from 'src/pages/create-lesson';

const routers = {
  login: {
    exact: true,
    path: routePath.SIGN_IN,
    component: Login,
    private: false,
  },
  // dashboard: {
  //   exact: true,
  //   path: routePath.DASHBOARD,
  //   component: Dashboard,
  //   private: true,
  // },
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
  manageClass: {
    exact: true,
    path: routePath.MANAGE_CLASS,
    component: ManageClass,
    private: true,
  },
  manageTest: {
    exact: true,
    path: routePath.MANAGE_TEST,
    component: ManageTest,
    private: true,
  },
  createLesson: {
    exact: true,
    path: routePath.CREATE_LESSON,
    component: CreateLesson,
    private: true,
  },
};

export default routers;
