import Navbar from "./components/Navbar/Navbar"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from './AllRoutes'
import './App.css';
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { ModalProvider } from "./hoc/ModalContext";
import LeftSideBarModal from "./components/LeftSidebar/LeftSideBarModal";



function App() {


  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(fetchAllQuestions())
   dispatch(fetchAllUsers())
  }, [dispatch]);
  

  return (
    <div className="App">
    <ModalProvider>
    <Router>
      <LeftSideBarModal/>
      <Navbar/>
      <AllRoutes/>
    </Router>
    </ModalProvider>
    </div>
  );
}

export default App;
