import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "./router.js";

export default function App() {
  const routing = useRoute(true);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
