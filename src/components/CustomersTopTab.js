import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import appTheme from '../constants/theme';

const CustomersTopTab = ({
  categories,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
}) => {
  return (
    <View style={styles.categoryListContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryIndex(index)}>
          <View>
            <Text
              style={{
                ...styles.categoryListText,
                color:
                  selectedCategoryIndex == index
                    ? appTheme.COLORS.black
                    : appTheme.COLORS.MainGray,
              }}>
              {item}
            </Text>
            {selectedCategoryIndex == index && (
              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: appTheme.COLORS.secondary,
                  marginTop: 5,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomersTopTab;

const styles = StyleSheet.create({
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
