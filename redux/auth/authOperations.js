import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebaseConfig";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const signUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(app);
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

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const signInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(app);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(updateUserProfile({ userId: user.uid }));
      console.log("user", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const signOutUser = () => async (dispatch, getState) => {
  const auth = getAuth(app);
  signOut(auth);
  dispatch(authSignOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  const auth = getAuth(app);
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
      };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
