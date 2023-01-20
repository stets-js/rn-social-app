import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, StyleSheet,TextInput,TouchableOpacity, Image,SafeAreaView, FlatList } from "react-native";
import firebaseapp from "../../firebase/firebaseConfig";
import { collection, getDocs, onSnapshot,addDoc  } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const images = {
  sendIcon: require("../../assets/images/send.png"),
};

export default function CommentsScreen({route}) {
  const { postId, postPhoto } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async() => {
    const db = getFirestore(firebaseapp);
   await addDoc(collection(db, "posts", postId, "comments"),
      {comment, time: Date.now(), login: login}
    )
    setComment("")
  };

  const getAllPosts = async () => {
    const db = getFirestore(firebaseapp);
    onSnapshot(collection(db, "posts", postId, "comments"), (data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
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
      <View style={styles.postImgBox}>
      <Image
              source={{uri: postPhoto }}
              style={styles.postImg}
            />
      </View>
       <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.logoImg}>{item.login}</Text>
                  <View style={styles.commentTextBox}>
                  <Text style={styles.comment}>{item.comment}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                  </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
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
  postImgBox:{
    width: "100%",
    height: 240,
    marginVertical:32,
  },
  postImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
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
commentContainer:{
  flex:1,
  flexDirection:"row",
  alignItems:"flex-start",
  marginBottom: 24,
  
},
logoImg:{
  marginRight: 16,
},
commentTextBox:{
  

  backgroundColor: "rgba(0, 0, 0, 0.03)",
  borderRadius: 6,
  padding: 16,
  fontFamily: "Robo-Regular",
fontSize: 13,
},
comment:{
flexWrap: "wrap",

},
});