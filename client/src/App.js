import Navbar from "./components/Navbar/Navbar"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from './AllRoutes'
import './App.css';
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";



function App() {


  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(fetchAllQuestions())
   dispatch(fetchAllUsers())
  }, [dispatch]);
  

  return (
    <div className="App">
    <Router>
      <Navbar/>
      <AllRoutes/>
    </Router>
    </div>
  );
}

export default App;
