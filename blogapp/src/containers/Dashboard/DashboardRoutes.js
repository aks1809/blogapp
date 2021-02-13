import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const routes = [
  {
    path: "",
    exact: true,
    component: lazy(() => import("../Categories/Categories")),
  },
  {
    path: "economics",
    component: lazy(() => import("../Blogs/Economics")),
  },
  {
    path: "technology",
    component: lazy(() => import("../Blogs/Technology")),
  },
  {
    path: "science",
    component: lazy(() => import("../Blogs/Science")),
  },
  {
    path: "sports",
    component: lazy(() => import("../Blogs/Sports")),
  },
];

const DashboardRoutes = () => {
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
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`/${route.path}`}>
            <Header />
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
};

export default DashboardRoutes;
