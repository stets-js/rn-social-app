import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import RegistrationScreen from "./screens/RegistrationScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import PostsScreen from "./screens/PostsScreen.jsx";
import CreatePostsScreen from "./screens/CreatePostsScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PostIcon from "./components/PostIcon.jsx";
import NewPostIcon from "./components/NewPostIcon.jsx";
import UserIcon from "./components/UserIcon.jsx";
import BackBtn from "./components/BackBtn.jsx";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import CommentsScreen from "./screens/nestedScreens/CommentsScreen";
import MapScreen from "./screens/nestedScreens/MapScreen";

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}
