import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import RegistrationScreen from "./screens/RegistrationScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import PostsScreen from "./screens/PostsScreen.jsx";
import CreatePostsScreen from "./screens/CreatePostsScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import LogoutBtn from "./components/LogOutBtn.jsx";

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
    <Tab.Navigator initialRouteName="Posts">
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => <LogoutBtn />,
          title: "Posts",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen name="Create" component={CreatePostsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
