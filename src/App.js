import React from 'react';
import './App.css';
// import LoginComponent from "./components/LoginComponent"
// import { useSelector } from "react-redux"
// import Home from "./components/Home"
import RouterComp from "./components/RouterComp/index"

function App() {
  // const [isLoggedIn,setIsLoggedIn] = useState(false)

  // const isLoggedIn = useSelector((state) => state.isLoggedIn)
  // console.log("isLoggedIn:", isLoggedIn)

  return (
    <div className="App">


     
      <RouterComp />


      {/* {!isLoggedIn && <LoginComponent setIsLoggedIn={setIsLoggedIn}/>} */}
      {/* {isLoggedIn && <Home />} */}


    </div>
  );
}

export default App;
