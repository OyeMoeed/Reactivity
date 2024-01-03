/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.addlike = functions.firestore.document('/Posts/{creatorId}/Uploads/{postId}/likes/{userId}');
    .onCreate((snap, context) => {
    return db.collection('Posts').doc(context.params.creatorId).collection('Uploads').doc(context.params.userId).update({ likesCount: admin.firestore.FieldValue.increment(1)})
})
exports.removelike = functions.firestore.document('/Posts/{creatorId}/Uploads/{postId}/likes/{userId}');
    .onCreate((snap, context) => {
    return db.collection('Posts').doc(context.params.creatorId).collection('Uploads').doc(context.params.userId).update({ likesCount: admin.firestore.FieldValue.increment(-1)})
})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
