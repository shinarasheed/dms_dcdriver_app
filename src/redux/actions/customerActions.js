import axios from 'axios';

import {
  CREATE_ONE_OF_CUSTOMER_REQUEST,
  CREATE_ONE_OF_CUSTOMER_SUCCES,
  CREATE_ONE_OF_CUSTOMER_FAIL,
} from '../constants/customerConstants';
import {customerUrl} from '../../utils/baseUrl';

export const createCustomerOneOf =
  ({phoneNumber, customerName}) =>
  async dispatch => {
    try {
      dispatch({
        type: CREATE_ONE_OF_CUSTOMER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = {
        phoneNumber,
        customerName,
        country: 'Nigeria',
      };

      const {
        data: {result},
      } = await axios.post(
        `${customerUrl}/oneoff-customer/register`,
        body,
        config,
      );

      dispatch({
        type: CREATE_ONE_OF_CUSTOMER_SUCCES,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_ONE_OF_CUSTOMER_FAIL,
        payload: 'There was an error',
      });
    }
  };
