import routePath from 'src/constants/routePath';
import Login from 'src/pages/login';
import { UserRole } from 'src/constants/constants';
import { Route } from 'react-router-dom';
import Dashboard from 'src/pages/dashboard';

const routers = {
  login: {
    exact: true,
    path: routePath.SIGN_IN,
    component: Login,
    route: Route,
    private: false,
  },
  dashboard: {
    exact: true,
    path: routePath.DASHBOARD,
    component: Dashboard,
    route: Route,
    private: false,
  }
};

export default routers;
