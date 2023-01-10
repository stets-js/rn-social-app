import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Text,TouchableOpacity } from "react-native";

const images = {
  map: require("../../assets/images/map.png"),
  comment: require("../../assets/images/comment.png"),
};

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <Text>Title</Text>
                <View>
                    <TouchableOpacity  style={{ width: 25, height: 25 }} onPress={() => navigation.navigate("Comments")}>
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
        justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
