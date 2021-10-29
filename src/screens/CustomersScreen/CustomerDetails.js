import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import moment from 'moment';
import {Button} from 'react-native-elements';

import {useRoute, useNavigation} from '@react-navigation/native';
import appTheme from '../../constants/theme';
import {icons} from '../../constants';

import Header from '../../components/Header';
import CustomVirtualizedView from '../../components/VirtualizedList';
import CallCustomer from '../../components/CallCustomer';

const Customer = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {order, numberOfOrders, allOrders} = route.params;

  const customerOrders = allOrders.filter(
    od => od.buyerCompanyId === order.buyerCompanyId,
  );

  const back = () => {
    navigation.goBack();
  };

  const SingleCustomer = ({item}) => {
    const totalPrice = () => {
      return item.orderItems.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0,
      );
    };
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: appTheme.COLORS.Grey,
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', marginBottom: 7}}>
          <Text
            style={{
              color: appTheme.COLORS.mainTextGray,
              fontSize: 14,
              ...appTheme.FONTS.mainFontLight,
            }}>
            Order: {item?.referenceId},
          </Text>
          <Text
            style={{
              color: appTheme.COLORS.mainTextGray,
              fontSize: 14,
              marginRight: 5,
              marginLeft: 8,
              ...appTheme.FONTS.mainFontLight,
            }}>
            {moment(item?.orderStatus[0]?.dateAssigned).format('MMM Do, YYYY')}
          </Text>
          <Text
            style={{
              textTransform: 'lowercase',
              color: appTheme.COLORS.MainGray,
              fontSize: 14,
              ...appTheme.FONTS.mainFontLight,
            }}>
            at {moment(item?.orderStatus[0]?.timeAssigned).format('hh:mm')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                ...appTheme.FONTS.mainFontLight,
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              {`${item.orderItems.length} ${
                item.orderItems.length !== 1 ? 'products' : 'product '
              }`}
            </Text>
            <View
              style={{
                width: 100,
                height: 30,
                marginLeft: 20,
                alignItems: 'center',
                backgroundColor:
                  item.status === 'Assigned'
                    ? appTheme.COLORS.Grey
                    : item.status === 'Accepted'
                    ? appTheme.COLORS.mainYellow
                    : item.status === 'Completed'
                    ? appTheme.COLORS.mainGreen
                    : appTheme.COLORS.mainRed,
                paddingHorizontal: 10,
                fontWeight: '600',
                borderRadius: 20,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color:
                    item.status === 'Assigned'
                      ? appTheme.COLORS.black
                      : item.status === 'Accepted'
                      ? appTheme.COLORS.white
                      : item.status === 'Completed'
                      ? appTheme.COLORS.white
                      : appTheme.COLORS.white,
                }}>
                {item?.status}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 16,
              ...appTheme.FONTS.mainFontLight,
              color: appTheme.COLORS.MainGray,
            }}>
            {'\u20A6'}
            {totalPrice()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{backgroundColor: appTheme.COLORS.mainBackground, flex: 1}}>
      <Header
        back={back}
        goBack
        headerText={order !== undefined && order.buyerDetails[0].buyerName}
      />
      <CustomVirtualizedView>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>
              Customer Code: {order !== undefined && order.buyerCompanyId}
            </Text>
            <View
              style={{
                backgroundColor: appTheme.COLORS.mainGreen,
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  ...appTheme.FONTS.mainFontLight,
                }}>
                Confirmed
              </Text>
            </View>
          </View>

          <View>
            {/* <Text style={{fontSize: 15}}>Total Amount Spent</Text> */}
            <Text style={{fontSize: 20, ...appTheme.FONTS.mainFontBold}}>
              {/* {'\u20A6'}10,040,888.33 */}
            </Text>
            <Text style={{fontSize: 15, ...appTheme.FONTS.mainFontLight}}>
              {numberOfOrders.length}{' '}
              {`${numberOfOrders.length > 1 ? 'Orders' : 'Order'}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            paddingLeft: 20,
            paddingVertical: 20,
            marginBottom: 30,
          }}>
          <View>
            <Text
              style={{
                color: appTheme.COLORS.MainGray,
                fontSize: 18,
                marginBottom: 15,
              }}>
              Contact Details
            </Text>
            <Text
              style={{
                fontSize: 16,
                ...appTheme.FONTS.mainFontBold,
                color: appTheme.COLORS.black,
              }}>
              {order.buyerDetails[0]?.buyerName}
            </Text>
          </View>

          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <Image source={icons.addressIcon} />
            <View style={{marginLeft: 10, paddingRight: 50}}>
              <Text style={{marginBottom: 5, fontSize: 17, lineHeight: 25}}>
                {order?.buyerDetails[0]?.buyerAddress}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginBottom: 10,
                  color: appTheme.COLORS.black,
                }}>
                local government area
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textTransform: 'uppercase',
                  color: appTheme.COLORS.black,
                }}>
                {order?.buyerDetails[0]?.buyerAddress}
              </Text>

              <View style={{marginTop: 20, flexDirection: 'row'}}>
                <Text style={{fontSize: 15, color: appTheme.COLORS.black}}>
                  {order?.buyerDetails[0]?.buyerPhoneNumber}
                </Text>

                <CallCustomer
                  phoneNumber={order?.buyerDetails[0]?.buyerPhoneNumber}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              ...appTheme.FONTS.mainFontBold,
              marginLeft: 20,
            }}>
            Order History
          </Text>

          <FlatList
            style={{
              backgroundColor: appTheme.COLORS.white,
              marginTop: 25,
            }}
            data={customerOrders}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({item}) => <SingleCustomer item={item} />}
            ListFooterComponent={() => (
              <View>
                <Button
                  disabled
                  buttonStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: '90%',
                    height: 50,
                    borderRadius: 4,
                    backgroundColor: appTheme.COLORS.mainRed,
                    marginTop: 20,
                  }}
                  title="Show More"
                />
              </View>
            )}
          />
        </View>
      </CustomVirtualizedView>

      {/* footer */}

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: appTheme.COLORS.borderGRey,
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: appTheme.COLORS.white,
          marginTop: 30,
        }}>
        <Button
          onPress={() => navigation.navigate('SellToCustomer', order)}
          buttonStyle={{
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            backgroundColor: appTheme.COLORS.mainRed,
          }}
          title="Sell to Customer"
        />
      </View>
    </SafeAreaView>
  );
};

export default Customer;
