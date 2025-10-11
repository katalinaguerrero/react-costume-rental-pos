import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar/Navbar";
import { routes } from "constants/routes";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.title =
      routes.find((route) => route.path === location.pathname)?.windowTitle ||
      "Comercial Mary";
  }, [location]);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Navbar />
      <div className="container-fluid mt-4 px-5">
        <div className="containerPersonal">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </SnackbarProvider>
  );
};

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
