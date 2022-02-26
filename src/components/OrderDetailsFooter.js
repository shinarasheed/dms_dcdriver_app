import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import appTheme from "../constants/theme";
const OrderDetailsFooter = ({
  theOrder,
  toggle,
  updateOrderStatus,
  toggleProduct,
}) => {
  return (
    <>
      {theOrder?.status === "Assigned" && (
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: appTheme.COLORS.mainRed,
              borderRadius: 4,
              width: 150,
              height: 45,
              justifyContent: "center",
            }}
            onPress={() => toggle()}
          >
            <Text
              style={{
                fontSize: 17,
                color: appTheme.COLORS.white,
                textAlign: "center",
              }}
            >
              Reject Order
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: appTheme.COLORS.mainGreen,
              borderRadius: 4,
              width: 150,
              height: 45,
              justifyContent: "center",
            }}
            onPress={() => updateOrderStatus("Accepted")}
          >
            <Text
              style={{
                fontSize: 17,
                color: appTheme.COLORS.white,
                textAlign: "center",
              }}
            >
              Accept Order
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* new stuffs */}

      {theOrder?.status === "Accepted" && (
        <>
          <View
            style={{
              backgroundColor: appTheme.COLORS.white,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => toggleProduct()}
              style={{
                backgroundColor: appTheme.COLORS.mainRed,
                width: "100%",
                height: 45,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Deliver Order
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default OrderDetailsFooter;
