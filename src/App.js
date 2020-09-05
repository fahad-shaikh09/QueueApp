import React, {useState} from 'react';
import './App.css';
import LoginComponent from "./components/LoginComponent"
// import { useSelector } from "react-redux"
import Home from "./components/Home"

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  // const isLoggedIn = useSelector((state) => state.isLoggedIn)
  // console.log("isLoggedIn:", isLoggedIn)
 
  return (
    <div className="App">
      {!isLoggedIn && <LoginComponent setIsLoggedIn={setIsLoggedIn}/>}

      {isLoggedIn && <Home />}

    </div>
  );
}

export default App;
