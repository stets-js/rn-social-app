import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import appFirebase from "../../firebase/firebaseConfig";

export const signUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    const auth = getAuth(appFirebase);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("registered user --->>>>>", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

export const signInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth(appFirebase);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("logined user ---->>>>>", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

export const signOutUser = () => async (dispatch, getState) => {};
