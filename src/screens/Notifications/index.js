import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import appTheme from '../../constants/theme';

import {Notifications} from '../../data';
import Header from '../../components/Header';
import TopTabs from '../../components/CustomersTopTab';
import Notification from '../../components/Notification';
import CustomVirtualizedView from '../../components/VirtualizedList';

const index = () => {
  const categories = ['ALL', 'UNREAD', 'READ'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const navigation = useNavigation();

  const back = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}>
      <Header back={back} goBack headerText="Notifications" />

      <View
        style={{
          paddingLeft: 20,
          paddingRight: 150,
        }}>
        <TopTabs
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
        />
      </View>
      <FlatList
        data={Notifications}
        keyExtractor={(item, id) => id.toString()}
        renderItem={({item}) => <Notification item={item} />}
        contentContainerStyle={{
          backgroundColor: appTheme.COLORS.white,
          paddingLeft: 20,
          marginTop: 20,
          paddingTop: 30,
          paddingBottom: 50,
        }}
      />
    </SafeAreaView>
  );
};

export default index;
