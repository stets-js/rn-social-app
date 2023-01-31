import React, { useEffect, useState,useCallback } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/auth/authOperations";
import firebaseapp from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const images = {
  map: require("../assets/images/map.png"),
  comment: require("../assets/images/comment.png"),
};


export default function ProfileScreen({navigation}) {
    const dispatch = useDispatch();
    const [userPosts, setUserPosts] = useState([]);
    const { userId, login, avatar } = useSelector((state) => state.auth);
  
    useEffect(() => {
      getUserPosts();
    }, []);
  
    const getUserPosts = async () => {
        const db = getFirestore(firebaseapp);
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("userId", "==", userId));
        onSnapshot(q, (data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
      <ImageBackground style={styles.bg} source={require("../assets/bg.jpg")}>
      <View style={styles.container}>
        <View style={styles.profileBox}>
            <Image
                source={{ uri: avatar }}
                style={styles.userAvatar}
              />
              <TouchableOpacity style={styles.logoutBtn} onPress={() => signOut()}>
                      <Image
                      source={require("../assets/images/log-out.png")}
                    />
                    </TouchableOpacity>
              <Text style={styles.textlogin} onLayout={onLayoutRootView}>{login}</Text>

           
        
          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View
                style={styles.postBox}
              >
                <Image
                  source={{ uri: item.postPhotoUrl }}
                  style={styles.postImg}
                />
                <Text style={styles.postTitle}>{ item.title}</Text>
                <View style={styles.detailsBox}>
                    <TouchableOpacity style={styles.commentBox} onPress={() => navigation.navigate("Comments", { postId: item.id, postPhoto: item.postPhotoUrl }) }>
                      <Image
                      source={images.comment}
                      style={{ width: 25, height: 25 }}
                    />
                    <Text style={styles.commentCounter}>10</Text>
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.locationBox} onPress={() => navigation.navigate("Map", {item: item})}>
                          <Image
                          source={images.map}
                          style={{ width: 25, height: 25 }}
                        />
                        <Text style={styles.locationTitle}>{ item.locationTitle}</Text>
                        </TouchableOpacity>
                      
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
    );
  };
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
      justifyContent: "flex-start",
    },
    bg: {
      flex: 1,
      resizeMode: "cover",
    },
    profileBox:{
      flex: 1,
      marginTop: 150,
      paddingHorizontal: 16,
      paddingTop:92,
       backgroundColor: "#FFFFFF",
       borderTopLeftRadius: 25,
       borderTopRightRadius: 25,
    },
    userAvatar:{
      width:120,
      height:120,
      position: "absolute",
      top: -60,
      left: (Dimensions.get('window').width / 2)-60,
      width: 120,
      height: 120,
      backgroundColor: "#F6F6F6",
    borderRadius:16,
    },
    logoutBtn:{
     width: 24, 
     height: 24,
     position: "absolute",
     top: 22,
     right: 16,
    },
    textlogin:{
    fontSize: 30,
    marginBottom: 32,
    textAlign: "center",
    },
    postBox:{
      marginBottom: 30,
    },
    postImg:{
      height: 240,
      borderRadius: 8,
      marginBottom:8,
    },
    postTitle:{
      fontFamily: "Robo-Medium",
      fontSize: 16,
      marginBottom:8,
    },
    detailsBox:{
      flex: 1,
      flexDirection:"row",
      
    },
    commentBox:{
      flex:1,
      flexDirection: "row",
    },
    commentCounter:{
      fontFamily: "Robo-Medium",
      fontSize: 16,
      marginLeft:5, 
    },
    locationBox:{
      flex:2,
      justifyContent: "flex-end",
     flexDirection: "row",
      //borderWidth: 1, borderColor: 'blue'
  },
  locationTitle:{
    fontFamily: "Robo-Medium",
    fontSize: 16,
    textDecorationLine: "underline",
    marginLeft:5,
    },
  });