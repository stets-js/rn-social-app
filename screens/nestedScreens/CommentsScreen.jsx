import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, StyleSheet } from "react-native";

export default function CommentsScreen() {
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
        <View style={styles.messageInput} onLayout={onLayoutRootView}>
                <TextInput
                  style={styles.inputLocation}
                  placeholder="Comment"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="visible-password"
                  value={locationTitle}
                  onChangeText={(value) =>
                    setLocationTitle(value)
                  }
                />
              </View>
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});