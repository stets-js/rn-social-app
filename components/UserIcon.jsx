import React from "react";
import { Image } from "react-native";

export default function UserIcon() {
  return (
    <>
      <Image
        style={{ width: 24, height: 24 }}
        source={require("../assets/images/user.png")}
      />
    </>
  );
}