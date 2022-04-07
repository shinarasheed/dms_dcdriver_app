import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import axios from "axios";

import { BottomSheet } from "react-native-btr";
import { icons } from "../constants";
import appTheme from "../constants/theme";
import { fetchOrder } from "../redux/actions/orderActions";
import { orderUrl } from "../utils/baseUrl";

const RejectOrderSheet = ({ toggle, visible, theOrder, settheOrder, item }) => {
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateOrderStatus = async (status, reasonForRejection) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        status,
        reasonForRejection,
      };
      setLoading(true);

      const { data: order } = await axios.patch(
        `${orderUrl}/UpdateOrder/UpdateStatus/${item.orderId}`,
        body,
        config
      );
      settheOrder(order?.order[0]);
      setLoading(false);
      setRejectReason("");
      dispatch(fetchOrder());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: "#fff",
          height: 200,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          justifyContent: "center",
          paddingHorizontal: 40,
        }}
      >
        <Pressable
          style={{ position: "absolute", top: 15, right: 20 }}
          onPress={() => toggle()}
        >
          <Image source={icons.cancelIcon} />
        </Pressable>

        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Are you sure you want to reject this order?
        </Text>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <TextInput
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              width: "100%",
              borderColor: appTheme.COLORS.borderGRey,
              textAlign: "left",
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Medium",
            }}
            value={rejectReason}
            onChangeText={(text) => setRejectReason(text)}
            placeholder="Why do you want to reject this order?"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              width: 130,
              height: 45,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: appTheme.COLORS.borderGRey1,
            }}
            onPress={() => {
              toggle();
              setRejectReason("");
            }}
          >
            <Text>No</Text>
          </Pressable>

          <Pressable
            style={{
              width: 130,
              height: 45,
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginLeft: 20,
            }}
            onPress={() => {
              updateOrderStatus("Rejected", rejectReason);
              toggle();
            }}
          >
            {loading ? (
              <ActivityIndicator
                color={
                  Platform.OS === "android" ? appTheme.COLORS.white : undefined
                }
                animating={loading}
                size="large"
              />
            ) : (
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  ...appTheme.FONTS.mainFontBold,
                  fontSize: 16,
                }}
              >
                Yes, reject
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
};

export default RejectOrderSheet;
