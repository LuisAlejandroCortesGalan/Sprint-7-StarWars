import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import StarShips from "./components/StarShips";
import { PageProvider } from "./pageContext/PageProvider";


function App() {

  return (
    <>
    <PageProvider>
      <Header />
      <Nav />
      <StarShips />
      </PageProvider> 
    </>
  );
}

export default App;
