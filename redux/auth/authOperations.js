import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import appFirebase from "../../firebase/firebaseConfig";
import { authSlice } from "./authReducer";

export const signUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(appFirebase);
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => console.log("user--->>>", user));

      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const { displayName, uid } = await auth.currentUser;
      console.log("user", displayName, uid);

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const signInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(appFirebase);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      console.log("user", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const signOutUser = () => async (dispatch, getState) => {};

export const currentUser = () => async (dispatch, getState) => {
  const auth = getAuth(appFirebase);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      const currentUser = user;
      return currentUser;
    } else {
      return;
    }
  });
};
