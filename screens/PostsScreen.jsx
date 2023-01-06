import React from "react";
import {StyleSheet,Text,View} from "react-native"
export default function PostsScreen() {
    return (
        <View style={styles.bg}>
        <Text style={{fontSize:45}}>Posts Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex:1,
    backgroundColor: "#FFFFFF",
}
})