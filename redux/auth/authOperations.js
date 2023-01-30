import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, uploadBytes, uploadString,getDownloadURL,getMetadata ,updateMetadata } from "firebase/storage";

import app from "../../firebase/firebaseConfig";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const signUpUser =
  ({ email, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      const response = await fetch(avatar);
    const file = await response.blob();

      const auth = getAuth(app);
      const storage = getStorage(app);
      const storageRef = ref(storage, `/avatar/${email}`);
     const metadata = {
      contentType: 'image/jpeg',
    };
      const avatarUrl = await uploadBytesResumable(storageRef, file, metadata).then(()=> getDownloadURL(ref(storage, storageRef)).then((url) => url))

      await createUserWithEmailAndPassword(auth, email, password);
       onAuthStateChanged(auth, (user) => console.log("user--->>>", user));

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatarUrl,
      });

      const { displayName, uid, photoURL } = await auth.currentUser;
      //console.log("registeres user---->>>>", displayName, uid);

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        avatar: photoURL,
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
      console.log("loged user-->>>>", user);
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
        avatar: user.photoURL,
      };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
