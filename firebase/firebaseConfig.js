import { initializeApp } from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY_0zOj3ZAtakPJlhpe0SZr3BU_fzBytg",
  authDomain: "rn-social-7011a.firebaseapp.com",
  projectId: "rn-social-7011a",
  storageBucket: "rn-social-7011a.appspot.com",
  messagingSenderId: "24481658613",
  appId: "1:24481658613:web:f7adb3da172334ef3db7bc",
  measurementId: "G-1X88VFFRLY",
};

export const appFirebase = initializeApp(firebaseConfig);
