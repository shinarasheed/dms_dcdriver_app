import React from 'react';
import {View, FlatList} from 'react-native';
import DeliveryCard from './DeliveryCard';
import appTheme from '../constants/theme';

const DeliveryFlatList = ({list}) => {
  return (
    <>
      <FlatList
        data={list}
        style={{backgroundColor: appTheme.COLORS.white, marginBottom: 20}}
        keyExtractor={(item, id) => id.toString()}
        listKey={item => id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <DeliveryCard item={item} />}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: appTheme.COLORS.borderGRey,
            }}></View>
        )}
      />
    </>
  );
};

export default DeliveryFlatList;
