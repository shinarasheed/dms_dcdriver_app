import React from "react";
import { View } from "react-native";

import { BottomSheet } from "react-native-btr";
import OrderBottomSheet from "./OrderBottomSheet";
import appTheme from "../constants/theme";

const OrderDetailsBottomSheet = ({
  productsVisibile,
  toggleProduct,
  getProductDetails,
  theOrder,
  setProductsVisible,
  updateOrderStatus,
}) => {
  return (
    <>
      <BottomSheet
        visible={productsVisibile}
        onBackButtonPress={toggleProduct}
        onBackdropPress={toggleProduct}
      >
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
          }}
        >
          <OrderBottomSheet
            getProductDetails={getProductDetails}
            toggle={toggleProduct}
            item={theOrder}
            setVisible={setProductsVisible}
            visible={productsVisibile}
            updateOrderStatus={updateOrderStatus}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default OrderDetailsBottomSheet;
