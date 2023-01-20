import React, { useEffect, useState,useCallback } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/auth/authOperations";
import firebaseapp from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";


export default function ProfileScreen() {
    const dispatch = useDispatch();
    const [userPosts, setUserPosts] = useState([]);
    const { userId, login } = useSelector((state) => state.auth);
  
    useEffect(() => {
      getUserPosts();
    }, []);
  
    const getUserPosts = async () => {
        const db = getFirestore(firebaseapp);
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("userId", "==", userId));
        onSnapshot(q, (data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
    };

    const signOut = () => {
      dispatch(signOutUser());
    };

    const [fontsLoaded] = useFonts({
        "Robo-Regular": require("../assets/fonts/roboto/Roboto-Regular.ttf"),
        "Robo-Medium": require("../assets/fonts/roboto/Roboto-Medium.ttf"),
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }


    return (
      <View style={styles.container}>
        <View>
            <View>
        <Text style={styles.textlogin} onLayout={onLayoutRootView}>Login: {login}</Text>

            </View>
        
          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 10,
                 
                }}
              >
                <Image
                  source={{ uri: item.postPhotoUrl }}
                  style={{ width: 350, height: 200 }}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      justifyContent: "flex-start",
    },
    textlogin:{
    fontSize: 30,
    marginBottom: 50,
    textAlign: "center",

    }

  });