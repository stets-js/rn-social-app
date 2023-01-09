import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const images = {
  defaultIcon: require("../assets/images/noPhotoIco.png"),
  editPhotoIcon: require("../assets/images/editPhotoIco.png"),
};

SplashScreen.preventAutoHideAsync();

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState(null);
  const [locationTitle, setLocationTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true)
  const [permission, requestPermission] = Camera.useCameraPermissions();
 
  
useEffect(() => {
    console.log("photo--->>>>>", photo, "title--->>",title, "location-->>",locationTitle)
    if (photo && title && locationTitle) {
      setIsDisabled(false)
    }
  },[photo, title, locationTitle])

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

  const takePhoto = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    const data = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    console.log(location)
    setLocation(location);
    setPhoto(data.uri.toString());
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo,title, locationTitle, location });
    setPhoto(null);
    setTitle(null);
    setLocationTitle(null);
    setIsDisabled(true)
    setLocation(null)
  };

  const keyboardHide = () => {
    Keyboard.dismiss()
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      {photo ? (
        <View style={styles.takePhotoContainer}>
            <Image
            source={{ uri: photo }}
            style={styles.takedPhoto}
          />
          </View>
        ) :
          <View style={styles.cameraBox}>
        <Camera style={styles.camera} ref={setCamera}>
        <TouchableWithoutFeedback
          onPress={takePhoto}
          style={styles.snapContainer}
          disabled={false}
        >
              <Image source={images.defaultIcon} style={styles.snapIcon} />
        </TouchableWithoutFeedback>
        </Camera>
      </View>}

      {photo? <TouchableWithoutFeedback onPress={() => {
        setPhoto(null)
      }}>
        <Text>Edit photo</Text>
      </TouchableWithoutFeedback>: null}
      

      <View style={styles.titleBox} onLayout={onLayoutRootView}>
                <TextInput
                  style={styles.inputTitle}
                  placeholder="Title"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="visible-password"
                  value={title}
                  onChangeText={(value) =>
                    setTitle(value)
                  }
                />
              </View>
<View style={styles.locationBox} onLayout={onLayoutRootView}>
                <TextInput
                  style={styles.inputLocation}
                  placeholder="Location"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="visible-password"
                  value={locationTitle}
                  onChangeText={(value) =>
                    setLocationTitle(value)
                  }
                />
              </View>

      
      <View>
        <TouchableOpacity onPress={sendPhoto} style={!isDisabled ? styles.sendBtn : styles.sendBtnDisabled} disabled={isDisabled}>
          <Text style={!isDisabled ? styles.sendLabel : styles.sendLabelDisabled}>Create post</Text>
        </TouchableOpacity>
      </View>
      </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:32,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },
  cameraBox: {
    overflow: "hidden",
    borderRadius: 8,
    marginBottom:8,
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  snapContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  snapIcon: {
    position: "absolute",
  },
  takePhotoContainer: {
    height: 200,
    borderRadius: 8,
    height: 240,
    marginBottom:8,
    
  },
  takedPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
     
  },
  titleBox: {
    marginTop: 33,
    height: 50,
  },
  inputTitle: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: "Robo-Regular",
    borderBottomColor: "#E8E8E8",
  },
  locationBox: {
    marginTop: 17,
    height: 50,
  },
  inputLocation: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: "Robo-Regular",
    borderBottomColor: "#E8E8E8",
  },
  sendBtn: {
    height: 50,
    borderRadius: 10,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  sendBtnDisabled: {
    height: 50,
    borderRadius: 10,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  sendLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontSize: 16,
    fontFamily: "Robo-Regular",
  },
  sendLabelDisabled: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Robo-Regular",
  },
});
