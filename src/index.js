import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/context";

// Pages
import Layout from "./pages/Layout";
import User from "./pages/User";
import NoPage from "./pages/NoPage";
import ScrollToTop from "./pages/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path='/'
            element={<Layout />}
          >
            <Route
              index
              element={<App />}
            />
            <Route
              path='user/:userId'
              element={<User />}
            />
            <Route
              path='*'
              element={<NoPage />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  </React.StrictMode>
);
