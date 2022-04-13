import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import DatePicker from "react-native-neat-date-picker";
import { icons } from "../constants";

import { fetchOrderStats } from "../redux/actions/orderActions";
import appTheme from "../constants/theme";

const DateRangePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (start, end) => {
    setShowDatePicker(false);
    setStartDate(start.toISOString().substring(0, 10));
    setEndDate(end.toISOString().substring(0, 10));
    dispatch(
      fetchOrderStats(
        start.toISOString().substring(0, 10),
        end.toISOString().substring(0, 10)
      )
    );
  };

  console.log(startDate);

  return (
    <View>
      <TouchableOpacity
        onPress={openDatePicker}
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 110,
          height: 40,
          backgroundColor: appTheme.COLORS.white,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: appTheme.COLORS.borderGRey1,
          paddingLeft: 18,
        }}
      >
        <Image style={{ marginRight: 8 }} source={icons.calendarIcon} />
        {startDate ? (
          <Text style={{ color: appTheme.COLORS.black }}>{startDate}</Text>
        ) : (
          <Text style={{ color: appTheme.COLORS.black }}>Today</Text>
        )}
      </TouchableOpacity>
      <DatePicker
        isVisible={showDatePicker}
        mode={"range"}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </View>
  );
};

export default DateRangePicker;
