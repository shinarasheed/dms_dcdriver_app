import React from "react";
import { View, Text, Image } from "react-native";
import moment from "moment";

import appTheme from "../constants/theme";
import { icons } from "../constants";

const TimeLine = ({ theOrder }) => {
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        paddingLeft: 20,
        paddingVertical: 10,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 17,
          marginBottom: 10,
          fontWeight: "bold",
          color: appTheme.COLORS.black,
        }}
      >
        Timeline
      </Text>

      {theOrder !== undefined && theOrder?.status === "Completed" && (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 16, height: 16, marginRight: 5 }}
              source={icons.smallCheckIcon}
            />
            <Text> Completed </Text>
            <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
              on{" "}
              {moment(theOrder?.orderStatus[0]?.dateCompleted).format(
                "MMM Do, YYYY"
              )}{" "}
              {/* at{" "}
              {new Date(
                theOrder?.orderStatus[0]?.timeCompleted
              ).toLocaleTimeString()} */}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 16, height: 16, marginRight: 5 }}
              source={icons.smallCheckIcon}
            />
            <Text> Accepted </Text>
            <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
              on{" "}
              {moment(theOrder?.orderStatus[0]?.dateAccepted).format(
                "MMM Do, YYYY"
              )}{" "}
              {/* at{" "}
              {new Date(
                theOrder?.orderStatus[0]?.timeAccepted
              ).toLocaleTimeString()} */}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 16, height: 16, marginRight: 5 }}
              source={icons.smallCheckIcon}
            />
            <Text> Assigned </Text>
            <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
              to you on{" "}
              {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                "MMM Do, YYYY"
              )}{" "}
              {/* at{" "}
              {new Date(
                theOrder?.orderStatus[0]?.timeAssigned
              ).toLocaleTimeString()} */}
            </Text>
          </View>
        </>
      )}

      {theOrder !== undefined && theOrder?.status === "Assigned" && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 16, height: 16, marginRight: 5 }}
            source={icons.smallCheckIcon}
          />
          <Text> Assigned </Text>
          <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
            to you on{" "}
            {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
              "MMM Do, YYYY"
            )}{" "}
            {/* at{" "}
            {new Date(
              theOrder?.orderStatus[0]?.timeAssigned
            ).toLocaleTimeString()} */}
          </Text>
        </View>
      )}

      {/* rejected */}

      {theOrder?.status === "Rejected" && (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 16, height: 16, marginRight: 5 }}
              source={icons.rejectedIcon}
            />

            <Text> Rejected </Text>
            <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
              on{" "}
              {moment(theOrder?.orderStatus[0]?.dateRejected).format(
                "MMM Do, YYYY"
              )}
              {/* at{" "}
              {new Date(
                theOrder?.orderStatus[0]?.timeRejected
              ).toLocaleTimeString()} */}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 16, height: 16, marginRight: 10 }}
              source={icons.smallCheckIcon}
            />
            <Text>Assigned </Text>
            <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
              to you on{" "}
              {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                "MMM Do, YY"
              )}{" "}
              {/* at{" "}
              {new Date(
                theOrder?.orderStatus[0]?.timeAssigned
              ).toLocaleTimeString()} */}
            </Text>
          </View>
        </>
      )}

      {/* rejected */}

      {/* accepted */}

      {theOrder?.status === "Accepted" && (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 16, height: 16, marginRight: 5 }}
              source={icons.smallCheckIcon}
            />
            <Text> Accepted on </Text>
            <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
              {moment(theOrder?.orderStatus[0]?.dateAccepted).format(
                "MMM Do, YYYY"
              )}{" "}
              {/* at{" "}
              {new Date(
                theOrder?.orderStatus[0]?.timeAccepted
              ).toLocaleTimeString()} */}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 16, height: 16, marginRight: 10 }}
              source={icons.smallCheckIcon}
            />
            <Text>Assigned </Text>
            <Text style={{ fontSize: 14, textTransform: "lowercase" }}>
              to you on{" "}
              {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                "MMM Do, YYYY"
              )}{" "}
              {/* at{" "}
              {new Date(
                theOrder?.orderStatus[0]?.timeAssigned
              ).toLocaleTimeString()} */}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TimeLine;
