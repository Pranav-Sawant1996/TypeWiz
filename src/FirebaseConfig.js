import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'  //for login and signup functionality of firebas


const firebaseConfig={
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE,
    messagingSenderId:process.env.REACT_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID,
    measurementId:process.env.REACT_APP_MEASUREMENT_ID

}

const firebaseApp= firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

export {auth}
