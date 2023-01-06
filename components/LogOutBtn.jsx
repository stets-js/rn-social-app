import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  
} from "react-native";

const images = {
    logout: require("../assets/images/log-out.png"),
}


export default function LogoutBtn() {
    return (
        <TouchableOpacity style={styles.logout}>
                 <Image source={images.logout}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    logout: {
    marginRight: 16,
}
})