// for error handling

var errorMapping={
    'auth/email-already-in-use' : 'Email already in use'  ,       // "auth/email-already-in-use"   is the error code taken form firebase by consoling err.code refer "auth.createUserWithEmailAndPassword" from signupForm
    'auth/wrong-password' : 'Invalid Password',
    'auth/weak-password' : 'Password should contain atleast 6 characters',
    'auth/user-not-found' : 'Invalid Credentials',
    'auth/unknown' : 'Please try again later'
}

export default errorMapping