import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, Image, Text,TouchableOpacity,Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import firebaseapp from "../../firebase/firebaseConfig";
import { collection, getDocs  } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import {getComments} from "../ProfileScreen"

const images = {
  map: require("../../assets/images/map.png"),
  comment: require("../../assets/images/comment.png"),
};

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  console.log( 'posts--->>>', posts)

const getAllPosts = async () => {
  const db = getFirestore(firebaseapp);
  const querySnapshot = await getDocs(collection(db, "posts"));
 Promise.all(querySnapshot.docs.map(async(doc) => ({ ...doc.data(), id: doc.id, commentTotal: await getComments(doc.id)}))).then((comments) => setPosts(comments))
}

  useEffect(() => {
  getAllPosts()
  }, []);
  

  const [fontsLoaded] = useFonts({
    "Robo-Regular": require("../../assets/fonts/roboto/Roboto-Regular.ttf"),
    "Robo-Medium": require("../../assets/fonts/roboto/Roboto-Medium.ttf"),
    test: require("../../assets/fonts/RubikBubbles-Regular.ttf"),
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
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={styles.postBox}
          >
            <View>
            <Image
              source={{uri: item.postPhotoUrl }}
              style={styles.postImg}
            />
            <View style={styles.authorBox}>
            <Image
              source={{uri: item.avatar }}
              style={styles.userAvatar}
              />
              <Text style={styles.userLogin} onLayout={onLayoutRootView}>{item.login}</Text>
            </View>
            </View>
            <Text style={styles.postTitle} >{ item.title}</Text>
                <View style={styles.detailsBox}>
                    <TouchableOpacity  style={styles.commentBox} onPress={() => navigation.navigate("Comments", { postId: item.id, postPhoto: item.postPhotoUrl }) }>
                      <Image
                      source={images.comment}
                      style={{ width: 25, height: 25 }}
                    />
                    <Text style={styles.commentCounter}>{item.commentTotal}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: "#FFFFFF",
    paddingHorizontal:16,
  },
  postBox: {
  marginBottom: 30,
  },
  authorBox:{
    position: "absolute",
  },
  userLogin:{
    position: "absolute",
    top: 10,
    left: 25,
    zIndex: 1,
    backgroundColor: "#FFFFFF",
paddingLeft: 40,
paddingRight: 20,
borderRadius: 8,
fontFamily: "Robo-Medium",
    fontSize: 16,
  },
  postImg: {
    width: Dimensions.get("window").width - 32,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  userAvatar:{
    width:40,
    height:40,
    top: 10,
    left: 10,
    zIndex: 2,
    position: "absolute",
  borderRadius:16,
  },
  postTitle: {
    fontFamily: "Robo-Medium",
    fontSize: 16,
    marginBottom:8,
  },
  detailsBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent:"space-between",
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
