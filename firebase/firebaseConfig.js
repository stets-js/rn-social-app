import { initializeApp } from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBY_0zOj3ZAtakPJlhpe0SZr3BU_fzBytg",
//   authDomain: "rn-social-7011a.firebaseapp.com",
//   projectId: "rn-social-7011a",
//   storageBucket: "rn-social-7011a.appspot.com",
//   messagingSenderId: "24481658613",
//   appId: "1:24481658613:web:f7adb3da172334ef3db7bc",
//   measurementId: "G-1X88VFFRLY",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDyB6qzYD4Wx3KtJ31PclwSK0NO9MzTXy8",
  authDomain: "rn-7000.firebaseapp.com",
  projectId: "rn-7000",
  storageBucket: "rn-7000.appspot.com",
  messagingSenderId: "485043147653",
  appId: "1:485043147653:web:d3692b05ba5f9a2eee2aec",
  measurementId: "G-2ENETQ0NQG"
};

export const firebaseapp = initializeApp(firebaseConfig);

