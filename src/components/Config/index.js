const firebaseConfig = {
    apiKey: "AIzaSyDVsZ4JVP731j3eA5ncLWIViuKjcsen7Qo",
    authDomain: "queueapp-001.firebaseapp.com",
    databaseURL: "https://queueapp-001.firebaseio.com",
    projectId: "queueapp-001",
    storageBucket: "queueapp-001.appspot.com",
    messagingSenderId: "925063065312",
    appId: "1:925063065312:web:27110ae2cd55409a366a85"
  };

  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  