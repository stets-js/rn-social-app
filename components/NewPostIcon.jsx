import React from "react";
import { Image } from "react-native";

export default function NewPostIcon() {
  return (
    <>
      <Image
        style={{ width: 70, height: 40 }}
        source={require("../assets/images/new.png")}
      />
    </>
  );
}
