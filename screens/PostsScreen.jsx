import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "./nestedScreens/DefaultScreenPosts";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import LogoutBtn from "../components/LogOutBtn.jsx";

const NestedScreen = createStackNavigator();
const Tab = createBottomTabNavigator();
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "./CreatePostsScreen.jsx";
import ProfileScreen from "./ProfileScreen.jsx";
import NewPostIcon from "../components/NewPostIcon.jsx";
import UserIcon from "../components/UserIcon.jsx";
import BackBtn from "../components/BackBtn.jsx";
import PostIcon from "../components/PostIcon.jsx";

export default function PostsScreen(){
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }} backBehavior="firstRoute">
      <Tab.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => <LogoutBtn />,
          title: "Posts",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, number, focused }) => {
            return <PostIcon />;
          },
        }}
      />
      <Tab.Screen
        name="Create tab"
        component={CreatePostsScreen}
        options={{
          tabBarHideOnKeyboard: true,
          title: "Create",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, number, focused }) => {
            return <NewPostIcon />;
          },
        //tabBarStyle: { display: "none" },
          headerLeft: () => <BackBtn />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, number, focused }) => {
            return <UserIcon />;
          },
        }}
      />
    </Tab.Navigator>
  );
};