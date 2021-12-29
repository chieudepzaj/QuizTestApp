import routePath from 'src/constants/routePath';
import Login from 'src/pages/login';
// import Dashboard from 'src/pages/dashboard';
import Profile from 'src/pages/profile';
import TakeQuiz from 'src/pages/features/student/take-quiz/TakeQuiz';
import Quiz from 'src/pages/features/student/quiz';
import ChartStudent from 'src/pages/features/student/chart-student';
import ManageTestTeacher from 'src/pages/features/teacher/manage-test-teacher';
import ManageClass from 'src/pages/features/teacher/manage-class';
import EditTest from 'src/pages/features/teacher/edit-test';
import CreateLesson from 'src/pages/features/teacher/create-lesson';
import ManageTestStudent from 'src/pages/features/student/manage-test-student';
import Dashboard from 'src/pages/dashboard';

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
  editTest: {
    exact: true,
    path: routePath.EDIT_TEST,
    component: EditTest,
    private: true,
  },
  manageTestTeacher: {
    exact: true,
    path: routePath.MANAGE_TEST,
    component: ManageTestTeacher,
    private: true,
  },
  createLesson: {
    exact: true,
    path: routePath.CREATE_LESSON,
    component: CreateLesson,
    private: true,
  },
  manageTestStudent: {
    exact: true,
    path: routePath.MY_TEST,
    component: ManageTestStudent,
    private: true,
  },
};

export default routers;
