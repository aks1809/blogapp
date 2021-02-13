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
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      }
    >
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
