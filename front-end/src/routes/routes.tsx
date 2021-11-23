import routePath from "src/constants/routePath";
import Login from "src/pages/login";
import { UserRole } from "src/constants/constants";
import { Route } from "react-router-dom";

const routers = {
    login: {
        exact: true,
        path: routePath.SIGN_IN,
        component: Login,
        route: Route,
        private: false,
    }
};

export default routers;