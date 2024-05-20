import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Main from "./components/layout/Main";
import Loading from "./components/loading/Loading";
// import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/custom.css";
import "./assets/styles/responsive.css";
import PrivateRouter from "./routes/private/PrivateRoute";
import PrivateRouting from "./routes/private/PrivateRouting";
import PublicRouter from "./routes/public/PublicRoute";
import PublicRouting from "./routes/public/PublicRouting";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <Loading>
        <Router>
          <Routes>
            <Route element={<PublicRouter />}>
              {PublicRouting.map((privateRoute, index) => {
                const { path, Component } = privateRoute;
                return (
                  <Route key={index} path={path} element={<Component />} />
                );
              })}
            </Route>

            <Route element={<PrivateRouter />}>
              {PrivateRouting.map((routingPatient, index) => {
                const { path, Component } = routingPatient;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Main>
                        <Component />
                      </Main>
                    }
                  />
                );
              })}
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
