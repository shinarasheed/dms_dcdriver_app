import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import {icons} from '../constants';
import appTheme from '../constants/theme';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
    };
  }

  setDates = dates => {
    this.setState({
      ...dates,
    });
  };

  render() {
    const {startDate, endDate, displayedDate} = this.state;
    return (
      <DateRangePicker
        onChange={this.setDates}
        endDate={endDate}
        startDate={startDate}
        displayedDate={displayedDate}
        range>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 110,
            height: 40,
            backgroundColor: appTheme.COLORS.white,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: appTheme.COLORS.borderGRey1,
            paddingLeft: 18,
          }}>
          <Image style={{marginRight: 8}} source={icons.calendarIcon} />
          <Text style={{color: appTheme.COLORS.black}}>Today</Text>
        </View>
      </DateRangePicker>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
