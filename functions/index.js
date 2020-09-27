const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.helloworld = functions.firestore.document('/companies').onCreate(snap => {
    console.log("inserted in companies")
    console.info("inserted in companies")
})




// https://firebase.google.com/docs/functions/get-started