import Dashboard from "../pages/home";
import Login from "../pages/login";
import SignUp from "../pages/signUp";


export const routeConfig = [
  { path: "/dashboard", component: Dashboard, protected: true },
  { path: "/", component: Login, protected: false },
  { path: "/SignUp", component: SignUp, protected: false },
];
