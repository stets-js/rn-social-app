import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "./nestedScreens/DefaultScreenPosts";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import LogoutBtn from "../components/LogOutBtn.jsx";

const NestedScreen = createStackNavigator();

export default function PostsScreen(){
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => <LogoutBtn />,
          title: "Posts",
          headerTitleAlign: "center",
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};