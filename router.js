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

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, number, focused }) => {
            return <PostIcon />;
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarHideOnKeyboard: true,
          title: "Create post",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, number, focused }) => {
            return <NewPostIcon />;
          },
          // tabBarStyle: { display: "none" },
          // headerLeft: () => <BackBtn />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, number, focused }) => {
            return <UserIcon />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
