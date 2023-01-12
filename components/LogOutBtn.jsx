import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity, 
} from "react-native";

import { useDispatch } from "react-redux";
import { signOutUser } from "../redux/auth/authOperations";

const images = {
    logout: require("../assets/images/log-out.png"),
}


export default function LogoutBtn() {
     const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUser());
  };
    return (
        <TouchableOpacity style={styles.logout}  onPress={signOut}>
                 <Image source={images.logout}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    logout: {
    marginRight: 16,
}
})