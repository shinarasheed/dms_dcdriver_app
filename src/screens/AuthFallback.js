import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { adService } from "ad-b2c-react-native";

const AuthFallback = () => {
  const getToken = async () => {
    const token = await adService.getIdToken();

    console.log(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View>
      <Text>AuthFallback</Text>
    </View>
  );
};

export default AuthFallback;

const styles = StyleSheet.create({});
