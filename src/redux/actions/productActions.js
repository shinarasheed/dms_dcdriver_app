import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from "../constants/productsContants";
import { productUrl } from "../../utils/baseUrl";

export const fetchProducts = (country) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCTS_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get(
      `${productUrl}/products?limit=12&page=5&country=${country}`
    );

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data,
    });

    await AsyncStorage.setItem("productsInVan", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: "There was an error",
    });
  }
};
