import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    // Link,
    // Redirect
  } from "react-router-dom";
import LoginComponent from '../LoginComponent';
import Home from "./../Home"
import { useSelector} from "react-redux"


const RouterComp = () => {

  // console.log("props in router", props)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  // const isLoggedIn = props.isLoggedIn;
  // console.log("isLoggedIn in Router comp:", isLoggedIn)
  // console.log('window.location.pathname***', window.location.pathname)
  const currentPath = window.location.pathname.length === 1 ? 'home' : window.location.pathname

  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Redirect to={currentPath} /> :  <LoginComponent />}
          </Route>
          
          <Route path="/home">
          { authChecker(isLoggedIn, <Home />) }
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

function authChecker(isLoggedIn, component){
  return isLoggedIn ? component : <Redirect to='/' />
}

export default RouterComp
