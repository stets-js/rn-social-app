import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
// import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

const images = {
  defaultIcon: require("../assets/images/noPhotoIco.png"),
  editPhotoIcon: require("../assets/images/editPhotoIco.png"),
};

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
console.log("before--photo-->>>", photo)
  const takePhoto = async () => {
    const data = await camera.takePictureAsync();
    setPhoto(data.uri.toString());
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo });
    setPhoto(null);
  };

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
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: "100%", width: "100%", borderRadius: 8 }}
            />
          </View>
        )}
        <TouchableWithoutFeedback
          onPress={takePhoto}
          style={styles.snapContainer}
          disabled={!photo? false: true}
        >
          <Image source={!photo ? images.defaultIcon : images.editPhotoIcon} />
        </TouchableWithoutFeedback>
      </Camera>
      <TouchableWithoutFeedback onPress={() => {
        setPhoto(null)
        console.log(photo)
      }}
      disabled={photo? false: true}>
        <Text>Edit photo</Text>
      </TouchableWithoutFeedback>
      <View>
        <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
});
