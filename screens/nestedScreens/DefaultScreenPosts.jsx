import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, Image, Text,TouchableOpacity,Dimensions } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import firebaseapp from "../../firebase/firebaseConfig";
import { collection, getDocs  } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const images = {
  map: require("../../assets/images/map.png"),
  comment: require("../../assets/images/comment.png"),
};

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

const getAllPosts = async () => {
  const db = getFirestore(firebaseapp);
  const querySnapshot = await getDocs(collection(db, "posts"));
 setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
            <Image
              source={{uri: item.postPhotoUrl }}
              style={styles.postImg}
            />
            <Text style={styles.postTitle} onLayout={onLayoutRootView}>{ item.title}</Text>
                <View style={styles.detailsBox}>
                    <TouchableOpacity  style={{ width: 25, height: 25 }} onPress={() => navigation.navigate("Comments", { postId: item.id, postPhoto: item.postPhotoUrl }) }>
                      <Image
                      source={images.comment}
                      style={{ width: 25, height: 25 }}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 25, height: 25 }} onPress={() => navigation.navigate("Map", {item: item})}>
                      <Image
                      source={images.map}
                      style={{ width: 25, height: 25 }}
                    />
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
  marginBottom: 10,
              
  },
  postImg: {
    width: Dimensions.get("window").width - 32,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    fontFamily: "Robo-Medium",
    fontSize: 16,
    marginBottom:11,
  },
  detailsBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent:"space-between",
  },
});
