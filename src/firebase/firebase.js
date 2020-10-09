import admin from 'firebase-admin'

const serviceAccount = require('./pulse-monitoring-22954-firebase-adminsdk-hzitn-66f9b8c35a.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pulse-monitoring-22954.firebaseio.com',
})

const auth = admin.auth()

export default auth
