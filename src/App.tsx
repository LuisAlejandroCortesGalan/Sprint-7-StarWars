import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import StarShips from "./components/StarShips";
import Welcome from "./components/Welcome"; 
import { PageProvider } from "./pageContext/PageProvider";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./authContext/AuthContext";

function ConditionalNav() {
  const location = useLocation();
  return location.pathname === "/" ? <Nav /> : null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
      <PageProvider>
        <ConditionalNav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/starships" element={
            <ProtectedRoute>
            <>
              <Header />
              <Nav /> 
              <StarShips />
            </>
            </ProtectedRoute>
          } />
          <Route path ="/LogIn" element={<LogIn/>}/>
          <Route path="Register" element={<Register/>}/>
        </Routes>
      </PageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
