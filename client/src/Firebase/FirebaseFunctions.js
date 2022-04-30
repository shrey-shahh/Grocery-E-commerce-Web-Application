import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    updatePassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import "./Firebase";

//import { auth } from "./Firebase";


 const auth = getAuth();

async function createUser(email, password, displayName) {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, { displayName: displayName });
}



async function changePassword(email, oldPassword, newPassword) {
    let credential = EmailAuthProvider.credential(auth.currentUser, email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
    await signOut();
}

async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

async function socialSignIn(provider) {
    let socialProvider = null;
    if (provider === "google") {
        socialProvider = new GoogleAuthProvider();
    } else if (provider === "facebook") {
        socialProvider = new FacebookAuthProvider();
    }
    try{
        await signInWithPopup(auth, socialProvider);
    }catch(error){
        console.log(error);
    }
    
}

async function passwordReset(email) {
    await sendPasswordResetEmail(auth, email);
}

async function dosignOut() {
    await signOut(auth);
}

//new code block for reset password



export { createUser, dosignOut, passwordReset, signIn, changePassword, socialSignIn };
