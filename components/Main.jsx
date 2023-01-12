import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "../router";
import { authStateCahngeUser } from "../redux/auth/authOperations";

export default function Main() {
    const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
    
    useEffect(() => {
    dispatch(authStateCahngeUser());
    }, []);
    
  const isLogined = useRoute(stateChange);
    useEffect(() => { }, []);

  return (
      <NavigationContainer>
          {isLogined}
      </NavigationContainer>
  );
}