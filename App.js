import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router.js";

export default function App() {
  const isPrivate = useRoute(true);
  return <NavigationContainer>{isPrivate}</NavigationContainer>;
}
