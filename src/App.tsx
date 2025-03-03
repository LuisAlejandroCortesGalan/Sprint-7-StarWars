import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import StarShips from "./components/StarShips";
import Welcome from "./components/Welcome"; 
import { PageProvider } from "./pageContext/PageProvider";

function ConditionalNav() {
  const location = useLocation();
  return location.pathname === "/" ? <Nav /> : null;
}

function App() {
  return (
    <Router>
      <PageProvider>
        <ConditionalNav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/starships" element={
            <>
              <Header />
              <Nav /> 
              <StarShips />
            </>
          } />
        </Routes>
      </PageProvider>
    </Router>
  );
}

export default App;
