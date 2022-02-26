import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { vehicleUrl } from "../../utils/baseUrl";
import { logOut } from "../../redux/actions/userActions";

const Continue = () => {
  const [driver, setDriver] = useState(null);

  const userState = useSelector((state) => state.user);

  const { driverEmail } = userState;

  useEffect(() => {
    let componentMounted = true;

    const action = setInterval(() => {
      const getDriver = async () => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const {
            data: { data },
          } = await axios.get(
            `${vehicleUrl}/GetVehicle/GetByEmail/${driverEmail}`,
            config
          );

          console.log(data, "======");
          if (componentMounted) {
            setDriver(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getDriver();
      console.log("checking for status...");
    }, 10000);
    return () => {
      clearInterval(action);
      componentMounted = false;
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 17,
          fontFamily: "Gilroy-Medium",
          textAlign: "center",
        }}
      >
        Your Account has been successfully created.
      </Text>

      <Text
        style={{
          fontSize: 17,
          fontFamily: "Gilroy-Medium",
        }}
      >
        Wait, Let's assign you a distributor
      </Text>
    </View>
  );
};

export default Continue;

const styles = StyleSheet.create({});
