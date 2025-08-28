import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import SimulationPage from "./components/SimulationPage";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/Dashboard";
import ContactPage from "./components/Contact";
import AnalyticsPage from "./components/Analytics";

const Router = ({ children }) => children;
const Route = ({ path, component: Component, currentPath }) => {
  return currentPath === path ? <Component /> : null;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <Navigation
        currentPage={currentPage}
        navigate={navigate}
        scrollY={scrollY}
      />

      <Router>
        <Route
          path="home"
          component={() => <HomePage navigate={navigate} />}
          currentPath={currentPage}
        />
        <Route
          path="simulation"
          component={SimulationPage}
          currentPath={currentPage}
        />
        <Route
          path="dashboard"
          component={DashboardPage}
          currentPath={currentPage}
        />
        <Route
          path="analytics"
          component={AnalyticsPage}
          currentPath={currentPage}
        />
        <Route path="about" component={AboutPage} currentPath={currentPage} />
        
      </Router>
    </div>
  );
};

export default App;
