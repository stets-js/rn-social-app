import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import useRoute from "./router.js";
import { store } from "./redux/store";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "./firebase/firebaseConfig";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth(appFirebase);
  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });
  const isLogined = useRoute(currentUser);

  return (
    <Provider store={store}>
      <NavigationContainer>{isLogined}</NavigationContainer>
    </Provider>
  );
}
