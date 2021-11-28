import routePath from 'src/constants/routePath';
import Login from 'src/pages/login';
import Dashboard from 'src/pages/dashboard';
import Profile from 'src/pages/profile';

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
};

export default routers;
