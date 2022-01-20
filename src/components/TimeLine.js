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
          {theOrder?.orderStatus[0]?.dateCompleted !== null && (
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
              <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
                on{" "}
                {moment(theOrder?.orderStatus[0]?.dateCompleted).format(
                  "MMM Do, YYYY"
                )}{" "}
                at {theOrder?.orderStatus[0]?.timeCompleted.replace(/\s/g, "")}
              </Text>
            </View>
          )}

          {theOrder?.orderStatus[0]?.dateAccepted !== null && (
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
              <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
                on{" "}
                {moment(theOrder?.orderStatus[0]?.dateAccepted).format(
                  "MMM Do, YYYY"
                )}{" "}
                {theOrder?.orderStatus[0]?.timeAssigned !== null &&
                  `at ${theOrder?.orderStatus[0]?.timeAssigned.replace(
                    /\s/g,
                    ""
                  )}`}
              </Text>
            </View>
          )}

          {theOrder?.orderStatus[0]?.dateAssigned !== null && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 16, height: 16, marginRight: 5 }}
                source={icons.smallCheckIcon}
              />
              <Text> Assigned </Text>
              <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
                to you on{" "}
                {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                  "MMM Do, YYYY"
                )}{" "}
                {theOrder?.orderStatus[0]?.timeAssigned !== null &&
                  `at ${theOrder?.orderStatus[0]?.timeAssigned.replace(
                    /\s/g,
                    ""
                  )}`}
              </Text>
            </View>
          )}
        </>
      )}

      {theOrder !== undefined && theOrder?.status === "Assigned" && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 16, height: 16, marginRight: 5 }}
            source={icons.smallCheckIcon}
          />
          <Text> Assigned </Text>
          <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
            to you on{" "}
            {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
              "MMM Do, YYYY"
            )}{" "}
            {theOrder?.orderStatus[0]?.timeAssigned !== null &&
              `at ${theOrder?.orderStatus[0]?.timeAssigned.replace(/\s/g, "")}`}
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
            <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
              on{" "}
              {moment(theOrder?.orderStatus[0]?.dateRejected).format(
                "MMM Do, YYYY"
              )}
              at {theOrder?.orderStatus[0]?.timeRejected.replace(/\s/g, "")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 16, height: 16, marginRight: 10 }}
              source={icons.smallCheckIcon}
            />
            <Text>Assigned </Text>
            <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
              to you on{" "}
              {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                "MMM Do, YY"
              )}{" "}
              {theOrder?.orderStatus[0]?.timeAssigned !== null &&
                `at ${theOrder?.orderStatus[0]?.timeAssigned.replace(
                  /\s/g,
                  ""
                )}`}
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
            <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
              {moment(theOrder?.orderStatus[0]?.dateAccepted).format(
                "MMM Do, YYYY"
              )}{" "}
              at{" "}
              {theOrder?.orderStatus[0]?.timeAccepted !== null &&
                theOrder?.orderStatus[0]?.timeAccepted.replace(/\s/g, "")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 16, height: 16, marginRight: 10 }}
              source={icons.smallCheckIcon}
            />
            <Text>Assigned </Text>
            <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
              to you on{" "}
              {moment(theOrder?.orderStatus[0]?.dateAssigned).format(
                "MMM Do, YYYY"
              )}{" "}
              {theOrder?.orderStatus[0]?.timeAssigned !== null &&
                `at ${theOrder?.orderStatus[0]?.timeAssigned.replace(
                  /\s/g,
                  ""
                )}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TimeLine;
