import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
 Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/auth/authOperations";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import ImagePickerAvatar from "../components/Avatar";

SplashScreen.preventAutoHideAsync();

import sysAvatar from "../assets/images/sysAvatar.png";
const sysAvatarUri = Image.resolveAssetSource(sysAvatar).uri

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: sysAvatarUri,
};

export default function RegistrationScreen({ navigation }) {
  const [state, setstate] = useState(initialState);
  const [isHidden, setisHidden] = useState(true);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const avatarHandler = (value) => {setstate((prevState) => ({ ...prevState, avatar: value }))}
  console.log( 'state--->>>', state)

  const submitForm =  () => {
     dispatch(signUpUser(state));
    setstate(initialState);
   navigation.navigate("Home")
  };

  const [fontsLoaded] = useFonts({
    "Robo-Regular": require("../assets/fonts/roboto/Roboto-Regular.ttf"),
    "Robo-Medium": require("../assets/fonts/roboto/Roboto-Medium.ttf"),
    test: require("../assets/fonts/RubikBubbles-Regular.ttf"),
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
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <View style={styles.regBox}>
            <ImagePickerAvatar avatarHandler={avatarHandler}/>
            <View onLayout={onLayoutRootView}>
              <Text style={styles.formTitle}>REGISTRATION</Text>
            </View>

            <View style={styles.form}>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Login"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="visible-password"
                  value={state.login}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="visible-password"
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 43 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isHidden}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity style={styles.viewPassword}
                  onPress={() => { setisHidden(!isHidden) }}
                >
                  {isHidden ? <Text style={styles.viewPasswordTitle}>Show</Text> : <Text style={styles.viewPasswordTitle}>Hide</Text>}
                </TouchableOpacity>
              </View>
                  <TouchableOpacity style={styles.button} onPress={submitForm}>
                    <Text style={styles.buttonTitle}>Sign in</Text>
                  </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.footerLoginLink}>
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  regBox: {
    position: "relative",
    flex: 0.7,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    flex: 0.75,
    justifyContent: "flex-start",
    marginHorizontal: 16,
  },
  formTitle: {
    marginBottom: 33,
    color: "#212121",
    fontSize: 30,
    fontFamily: "Robo-Medium",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    fontFamily: "Robo-Regular",
  },
  button: {
    height: 51,
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 15,
    marginBottom: 16,
  },
  buttonTitle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Robo-Regular",
    fontSize: 16,
  },
  footerLoginLink: {
    textAlign: "center",
    color: "#1B4371",
  },
  viewPassword: {
    height: "100%",
    position: "absolute",
    right: 16,
  },
  viewPasswordTitle: {
    color: "#1B4371",
    fontFamily: "Robo-Regular",
    fontSize: 16,
    marginTop: "auto",
    marginBottom: "auto",
  },
});
