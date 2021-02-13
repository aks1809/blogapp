import React, { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import authActions from "./redux/auth/actions";
import Dashboard from "./containers/Dashboard/Dashboard";
import Header from "./containers/Header/Header";
import Categories from "./containers/Categories/Categories";
import Loader from "./containers/Loader/Loader";

const { login } = authActions;

const Routes = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.Auth.idToken);

  useEffect(() => {
    dispatch(login());
  }, [id]);

  const publicRoutes = [
    {
      path: "/signIn",
      exact: true,
      component: lazy(() => import("./containers/AuthPages/SignIn")),
    },
  ];

  const PrivateRoute = ({ children, ...rest }) => {
    const isLoggedIn = useSelector((state) => state.Auth.idToken);

    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signIn",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Switch>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.component />
            </Route>
          ))}
          <PrivateRoute path="/">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
