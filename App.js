import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import useRoute from "./router.js";
import { store } from "./redux/store";

export default function App() {
  const isPrivate = useRoute(false);
  return (
    <Provider store={store}>
      <NavigationContainer>{isPrivate}</NavigationContainer>
    </Provider>
  );
}
