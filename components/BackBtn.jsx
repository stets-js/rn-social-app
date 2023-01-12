import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const images = {
    logout: require("../assets/images/arrow-left.png"),
}


export default function BackBtn() {
    return (
        <TouchableOpacity style={styles.back}>
                 <Image source={images.logout}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    back: {
    marginLeft: 16,
}
})