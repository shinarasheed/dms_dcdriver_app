import { StyleSheet, Text, View, Image } from "react-native";
import { useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import RenderHtml from "react-native-render-html";
import { simpleHtml } from "../../utils/html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatPrice } from "../../utils/formatPrice";

const InvoiceScreen = ({ theOrder, products }) => {
  const [distributor, setDistributor] = useState(null);
  function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const { width } = useWindowDimensions();

  const getDistibutor = async () => {
    const distributor = JSON.parse(await AsyncStorage.getItem("distributor"));
    setDistributor(distributor);
  };

  useEffect(() => {
    getDistibutor();
  }, []);

  const getProductDetails = (productId) => {
    const x = products?.filter(
      (product) => product?.productId === productId.toString()
    )[0];
    return x;
  };

  const getTotalPrice = () => {
    return theOrder?.orderItems.reduce(
      (accumulator, order) =>
        accumulator +
        getProductDetails(order?.productId)?.price * order?.quantity,
      0
    );
  };

  const userState = useSelector((state) => state.user);

  const { user } = userState;

  const source = {
    html: `
    <section
    style="
      display: flex;
      flex-direction: column;
      /* justify-content: center;
      align-items: center; */
      padding-top: 40px;
      margin-bottom: 50px;
    "
  >
    <div>
      <div style="text-align: left">
        <img
          style="width: 20%"
          src="https://res.cloudinary.com/shinatech/image/upload/v1646297557/Header_Logo_-_Coloured_bv8zkj.svg"
          alt="Logo"
        />
      </div>
     
    </div>
   <div style="
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding-top: 40px;
   margin-bottom: 10px;
   
 "  >

<h5 style="font-size: 20px; font-weight: 'bold'; margin-bottom: 1px">
  ${distributor?.company_name}
</h5>
      <p style="color: grey; margin-bottom: 1px">${distributor?.address}</p>
      <p style="color: grey; margin-bottom: 5px">
        <span>Tel:</span>
        <span>${distributor?.Owner_Phone}</span>
      </p>
    </section>
    <section
      style="
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
        padding-left: 40px;
      "
    >
    <article>
    <h1 style="margin-bottom: 5px; font-weight: bold; font-size: 20px; color: #828297;">Invoice</h1>
    <div style="display: flex">
      <p style="margin-bottom: 5px">Date:</p>
      &nbsp;
      <p style="margin-bottom: 5px">${new Date().toLocaleDateString()}</p>
    </div>
    <div style="display: flex">
      <p style="margin-bottom: 5px">Invoive:</p>
      &nbsp;
      <p style="margin-bottom: 5px">#${getRandomIntBetween(100, 1000)}</p>
    </div>
    <div style="display: flex">
      <p style="margin-bottom: 5px">Order no:</p>
      &nbsp;
      <p style="margin-bottom: 5px">${theOrder?.orderId}</p>
    </div>
    <div style="display: flex">
      <p style="margin-bottom: 5px">Salesman:</p>
      &nbsp;
      <p style="margin-bottom: 5px">${user?.name}</p>
    </div>
  </article>

  <div>
    <h3>SOLD TO</h3>
    <div>
      <p style="font-weight: bold">
        ${theOrder?.buyerDetails[0]?.buyerName}
      </p>
      <p>${theOrder?.buyerDetails[0]?.buyerAddress}</p>
      <p>
        <span>Tel:</span>&nbsp;<span
          >${theOrder?.buyerDetails[0]?.buyerPhoneNumber}
        </span>
      </p>
    </div>
  </div>
</section>
<section>
  <table style="width: 100%; margin-top: 50px; margin-left: 20px">
    <thead>
      <tr>
        <th
          style="
            text-align: left;
            padding: 1rem 1rem;
            color: #000;
            font-size: 18px;
            border-bottom: 1px solid black;
          "
        >
          No
        </th>
        <th
          style="
            text-align: left;
            padding: 1rem 1rem;
            color: #000;
            font-size: 18px;
            border-bottom: 1px solid black;

          "
        >
          Product Description
        </th>
        <th
          style="
            text-align: left;
            padding: 1rem 1rem;
            color: #000;
            font-size: 18px;
            border-bottom: 1px solid black;

          "
        >
          Quantity
        </th>
        <th
          style="
            text-align: left;
            padding: 1rem 1rem;
            color: #000;
            font-size: 18px;
            border-bottom: 1px solid black;

          "
        >
          Unit Price
        </th>
        <th
          style="
            text-align: left;
            padding: 1rem 1rem;
            color: #000;
            font-size: 18px;
            border-bottom: 1px solid black;

          "
        >
          Amount
        </th>
      </tr>
    </thead>
    <tbody>
      ${theOrder?.orderItems.map(
        (item, index) => `
      <tr>
        <td style="padding: 1rem 1rem">${index + 1}</td>
        <td style="padding: 1rem 1rem">${
          getProductDetails(item?.productId)?.brand
        } ${getProductDetails(item?.productId)?.sku}</td>
        <td style="padding: 1rem 1rem">${item?.quantity}</td>
        <td style="padding: 1rem 1rem">
          ${user?.country === "UG" ? "UGX" : `\u20A6`}${formatPrice(
          item?.price
        )}
        </td>
        <td style="padding: 1rem 1rem">
          ${user?.country === "UG" ? "UGX" : `\u20A6`}${formatPrice(
          item.price * item.quantity
        )}
        </td>
      </tr>
      `
      )}
    </tbody>
  </table>
  

  <article
    style="
      background-color: #dadee3;
      padding-top: 0px;
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 20px;
    "
  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 20px;
        border-bottom: 2px solid black;
      "
    >
      <p>Additional Information</p>
      <p>Grand Total:</p>
    </div>

    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid black;
      "
    >
      <div>
        <div style="margin-bottom: 5px">
          <span style="font-size: 18px">Subtotal:</span
          ><span
            >${user?.country === "UG" ? "UGX" : `\u20A6`}${formatPrice(
      getTotalPrice()
    )}</span
          >
        </div>
     
      </div>
      <div>
        <h5 style="font-size: 30px">
          ${user?.country === "UG" ? "UGX" : `\u20A6`}${formatPrice(
      getTotalPrice()
    )}
        </h5>
      </div>
    </div>
  </article>
   </div>
  </section>`,
  };

  return <RenderHtml contentWidth={width} source={source} />;
};

export default InvoiceScreen;

const styles = StyleSheet.create({});
