import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import { adService } from "ad-b2c-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import appTheme from "../../constants/theme";
import Routes from "../../navigation/Routes";

const Continue = () => {
  const navigation = useNavigation();
  const clearTokens = async () => {
    await adService.logoutAsync();
    await AsyncStorage.clear();
    navigation.navigate(Routes.WELCOME_SCREEN);
  };

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
          fontSize: 15,
        }}
      >
        Your Account has been successfully created.
      </Text>

      <Text
        style={{
          fontSize: 15,
        }}
      >
        Please click the button below to signin
      </Text>

      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          backgroundColor: appTheme.COLORS.mainRed,
          marginTop: 20,
        }}
        onPress={() => clearTokens()}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 20,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Continue;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import { StyleSheet, Text, View } from "react-native";
// import { vehicleUrl } from "../../utils/baseUrl";
// import Routes from "../../navigation/Routes";

// const Continue = () => {
//   const navigation = useNavigation();
//   const [driver, setDriver] = useState(null);

//   const userState = useSelector((state) => state.user);

//   const { phoneNumber } = userState;

//   useEffect(() => {
//     let componentMounted = true;

//     const action = setInterval(() => {
//       const getDriver = async () => {
//         try {
//           const config = {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           };

//           const {
//             data: { data },
//           } = await axios.get(
//             `${vehicleUrl}/GetVehicle/GetByPhoneNumber/${phoneNumber}`,
//             config
//           );

//           console.log(data, "======");
//           if (componentMounted) {
//             setDriver(data);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       getDriver();
//       console.log("checking for status...");
//     }, 10000);
//     return () => {
//       clearInterval(action);
//       componentMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (driver?.ownerCompanyId) {
//       navigation.navigate(Routes.HOME_SCREEN);
//     }
//   }, [driver]);

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 17,
//           fontFamily: "Gilroy-Medium",
//           textAlign: "center",
//         }}
//       >
//         Your Account has been successfully created.
//       </Text>

//       <Text
//         style={{
//           fontSize: 17,
//           fontFamily: "Gilroy-Medium",
//         }}
//       >
//         Wait, Let's assign you a distributor
//       </Text>
//     </View>
//   );
// };

// export default Continue;

// const styles = StyleSheet.create({});
