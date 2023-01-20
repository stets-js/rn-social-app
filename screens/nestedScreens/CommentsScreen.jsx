import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, StyleSheet,TextInput,TouchableOpacity, Image } from "react-native";
import firebaseapp from "../../firebase/firebaseConfig";
import { collection, getDocs, onSnapshot,addDoc  } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const images = {
  sendIcon: require("../../assets/images/send.png"),
};

export default function CommentsScreen({route}) {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);

  const { login } = useSelector((state) => state.auth);
  
  const createPost = async() => {
    const db = getFirestore(firebaseapp);
   await addDoc(collection(db, "posts", postId, "comments"),
      {comment,id:postId, time: Date.now(), login: login}
    )
    setComment("")
  };


  const [fontsLoaded] = useFonts({
    "Robo-Regular": require("../../assets/fonts/roboto/Roboto-Regular.ttf"),
    "Robo-Medium": require("../../assets/fonts/roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return(
    <View style={styles.container}>
        <View style={styles.commentBox} onLayout={onLayoutRootView}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Comment"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="visible-password"
                  value={comment}
                  onChangeText={(value) =>
                    setComment(value)
                  }
                />
                <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
                  <Image source={images.sendIcon} style={styles.sendIcon} />
                </TouchableOpacity>
          </View>

    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    backgroundColor: "#fff",

  },
  commentBox:{
    marginBottom: 16,
  },
  commentInput:{
width: "100%",
height: 50,
backgroundColor: "#F6F6F6",
borderColor: "#E8E8E8",
borderRadius: 100,
borderWidth: 1,
paddingLeft: 16,
fontFamily: "Robo-Medium",
fontSize: 16,
  },
  sendBtn: {
    position:"absolute",
    top: 8,
    right: 8,
},
});