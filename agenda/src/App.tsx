import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import { useAuthStore } from "./store/authStore";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

const App: React.FC = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    retry: false,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div className="loading-screen">Cargando app ...</div>;
  }

  return (
    <Router>
      <AnimatedRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
};

const AnimatedRoutes: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={!isAuthenticated ? <AnimatedPage><Login /></AnimatedPage> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <AnimatedPage><Home /></AnimatedPage> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <AnimatedPage><Register /></AnimatedPage> : <Navigate to="/home" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
      </Routes>
    </AnimatePresence>
  );
};

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default App;
