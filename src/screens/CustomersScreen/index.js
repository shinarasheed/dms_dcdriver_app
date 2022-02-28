import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Nigeria from "../../components/Customers/Nigeria";
import Uganda from "../../components/Customers/Uganda";

const index = () => {
  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

  return <>{country === "UG" ? <Uganda /> : <Nigeria />}</>;
};

export default index;
