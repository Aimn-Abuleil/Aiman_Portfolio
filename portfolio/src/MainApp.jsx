/* eslint-disable */
import React, { useState, useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner";
import NavBarWithRouter from "./components/NavBar";
import Home from "./components/Home";
import endpoints from "./constants/endpoints";

// 🔒 Private Route Component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("token") === "loggedIn";
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function MainApp() {
  const [data, setData] = useState(null);
  const [r, setR] = useState(0); // 🔥 rerender trigger after login

  useEffect(() => {
    fetch(endpoints.routes)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, [r]); // reload routes when login changes

  // 🔥 Listen for login changes
  useEffect(() => {
    const reload = () => setR(Math.random());
    window.addEventListener("storage", reload);
    return () => window.removeEventListener("storage", reload);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />

      <main className="main">
        <Switch>
          <Suspense fallback={<FallbackSpinner />}>

            {/* Public Route */}
            <Route exact path="/" component={Home} />

            {/* Dynamic Routes */}
            {data &&
              data.sections.map((route) => {
                const SectionComponent = React.lazy(() =>
                  import("./components/" + route.component)
                );

                const isPrivate =
                  ["Dashboard", "DashboardProjects", "SkillDash", "Formdata"].includes(
                    route.component
                  );

                // 🔐 PRIVATE ROUTE
                if (isPrivate) {
                  return (
                    <PrivateRoute
                      key={route.path}
                      path={route.path}
                      component={(props) => (
                        <SectionComponent {...props} header={route.headerTitle} />
                      )}
                    />
                  );
                }

                // 🌐 PUBLIC ROUTE
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    component={(props) => (
                      <SectionComponent {...props} header={route.headerTitle} />
                    )}
                  />
                );
              })}
          </Suspense>
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;
