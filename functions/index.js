const functions = require("firebase-functions");
const admin = require('firebase-admin');
var serviceAccount = require('./lottovalue-firebase-adminsdk-4aodq-620a3323e9.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lottovalue-default-rtdb.asia-southeast1.firebasedatabase.app',
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.check = functions.region('asia-northeast3').runWith({timeoutSeconds: 120,memory: "1GB",}).https.onRequest(require('./checkValue.js'));



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions