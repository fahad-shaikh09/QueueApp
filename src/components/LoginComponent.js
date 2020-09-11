import React from 'react'
import * as firebase from 'firebase';
// import Home from "./Home"
import { useDispatch } from "react-redux"


const LoginComponent = (props) => {
    const dispatch = useDispatch();

    const firebaseConfig = {
        apiKey: "AIzaSyDVsZ4JVP731j3eA5ncLWIViuKjcsen7Qo",
        authDomain: "queueapp-001.firebaseapp.com",
        databaseURL: "https://queueapp-001.firebaseio.com",
        projectId: "queueapp-001",
        storageBucket: "queueapp-001.appspot.com",
        messagingSenderId: "925063065312",
        appId: "1:925063065312:web:27110ae2cd55409a366a85"
    };
    // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }

    var provider = new firebase.auth.FacebookAuthProvider();

    function loginFunc() {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("Token: ", token)
            console.log("User: ", user)
            // props.setIsLoggedIn(true)
            dispatch({
                type: "LOGIN_USER",
                payload: user.displayName
            })
            // ...
        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log("errorCode: ", errorCode)
                console.log("errorMessage: ", errorMessage)

                // The email of the user's account used.
                // var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
            })
    };



    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => loginFunc()}>Login with Facebook</button>
            <br />

            {/* {renderHome && <Home />} */}
        </div>
    )
}
export default LoginComponent