import React from "react";
import {
  createHTML,
  copyFromAssets,
  pickImage,
  processLocalImage,
} from "./helpers";
import appTheme from "../constants/theme";
import { formatPrice } from "./formatPrice";
import { icons, images } from "../constants";

function getRandomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const simpleHtml =
  (
    shouldRemovePageMargin = false,
    productsToSell,
    order,
    user,
    distributor,
    getTotalPrice,
    getEmptiesPrice
  ) =>
  () =>
    createHTML({
      content: `
      <section
      style="
        display: flex;
        flex-direction: column;
        /* justify-content: center;
        align-items: center; */
        padding-top: 40px;
      "
    >
    <div style="display: flex; flex-direction: row; width: 100%; margin-left:30px">
      <img
        style="width: 20%"
        src="https://res.cloudinary.com/shinatech/image/upload/v1646297557/Header_Logo_-_Coloured_bv8zkj.svg"
        alt="Logo"
      />
    <h5 style="font-size: 20px; font-weight: 'bold'; text-align: center; margin-left: 120px;">
      ${distributor?.company_name}
    </h5>
   
  </div>
     <div style="
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
   "  >
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
            <p style="margin-bottom: 5px">${order?.orderId || order?.id}</p>
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
              ${order?.buyerDetails[0]?.buyerName || order?.CUST_Name}
            </p>
            <p>${order?.buyerDetails[0]?.buyerAddress || order?.country}</p>
            <p>
              <span>Tel:</span>&nbsp;<span
                >${
                  order?.buyerDetails[0]?.buyerPhoneNumber || order?.phoneNumber
                }
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
            ${productsToSell.map(
              (item, index) => `
            <tr>
              <td style="padding: 1rem 1rem">${index + 1}</td>
              <td style="padding: 1rem 1rem">${item?.brand} ${item?.sku}</td>
              <td style="padding: 1rem 1rem">${item?.quantity}</td>
              <td style="padding: 1rem 1rem">
                ${user?.country === "UG" ? "UGX" : `\u20A6`}${formatPrice(
                (item?.high_end_price * item.quantity) / item.quantity
              )}
              </td>
              <td style="padding: 1rem 1rem">
                ${user?.country === "UG" ? "UGX" : `\u20A6`}${formatPrice(
                item?.high_end_price * item.quantity
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
              <div style="margin-bottom: 5px">
                <span style="font-size: 18px">Empties:</span
                ><span
                  >${user?.country === "UG" ? "UGX" : `\u20A6`}${formatPrice(
        getEmptiesPrice()
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
    </section>
    `,
      shouldRemovePageMargin,
      styles: `
    *{
        margin: 0;
        padding: 0;
    }
    .header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    margin-bottom: 50px;

    }

    .header h5{
        font-size: 20px;
        font-weight: 'bold';
        margin-bottom:5px;
    }

    .header p{
        color: grey;
        margin-bottom: 8px
    }

    .invoice{
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
        padding-left: 40px;
    }
    .invoice h1{
        margin-bottom: 5px;
    }

    .invoice article > div{
        display: flex;
    }

    .invoice p{
        margin-bottom: 5px;
    }

    table {
        width: 100%;
        margin-top: 50px;
        margin-left: 20px;
     }

     table th{
         text-align: left;
     }

     table th {
        padding: 1rem 1rem;
        color: #000;
        font-size: 18px;
    }

    table tr,
    table td {
        padding: 1rem 1rem;
    }

    .summary{
        background-color:#dadee3;
        padding-top: 20px;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 10px;

    }


    .info{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 20px;
        border-bottom: 2px solid black;
    }

    .summary span{
        font-size: 18px;
    }

    .sub{
        margin-bottom: 5px;
    }

    .subContainer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid black;
    }

    .totalPrice{
        font-size: 30px;
    }    
      `,
    });

const sectionStyle = `
    section {
      background-color: ${appTheme.COLORS.MainGray};
      height: 65vh;
      padding: 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  `;

const createSections = (
  secondText = "Hello, Upplabs! I'm a broken section!"
) => `
  <section>
    <h1>Hello, Upplabs! I'm a first section!</h1>
  </section>
  <section>
    <h1>${secondText}</h1>
  </section>
  `;

export const htmlWithBrokenSections =
  (shouldAvoidSectionBreaking = false) =>
  () => {
    const avoidBreakingStyle = `
      section {
        break-inside: avoid;
      }
    `;
    const secondSectionTitle = shouldAvoidSectionBreaking
      ? "Hello, Upplabs! I'm on the second page!"
      : undefined;
    return createHTML({
      content: createSections(secondSectionTitle),
      styles: `${sectionStyle} ${
        shouldAvoidSectionBreaking ? avoidBreakingStyle : ""
      }`,
    });
  };

export const htmlWithImage =
  (fromAssets = true) =>
  async () => {
    let src = !fromAssets
      ? "https://upplabs.com/wp-content/uploads/2019/11/Logo_upplabs@2x.png"
      : "";
    if (fromAssets) {
      try {
        const localSrc = await copyFromAssets(IMAGES.logo);
        src = await processLocalImage(localSrc);
      } catch (error) {
        console.log(error);
        src = "";
      }
    }
    return createHTML({
      content: `
      <h1>Hello, UppLabs! Look at ${
        !fromAssets ? "this remote image" : "image from applicaion assets"
      }!</h1>
      <div class="container">
        <a class="img-wrap" href="${src}">
          <img class="img-fluid" src="${src}" alt="Logo" />
        </a>
      </div>
    `,
      styles: `
      .img-wrap {
        display: block;
        text-align: center;
        cursor: pointer;
      }
    `,
    });
  };

export const htmlWithPickedImage =
  (fromCamera = false, optimize = false) =>
  async () => {
    let src = "";
    try {
      const { uri } = (await pickImage(fromCamera)) || {};
      if (uri) {
        src = await processLocalImage(uri, optimize);
      }
    } catch (error) {
      console.log(error);
      src = "";
    }

    if (!src) {
      return null;
    }

    return createHTML({
      content: `
        <h1>Hello, UppLabs! Look at this photo ${
          fromCamera ? "from Camera" : "from Gallery"
        }${optimize ? " (optimized)" : ""}!</h1>
        <div class="container">
          <img class="img-fluid" src="${src}" alt="photo" />
        </div>
      `,
    });
  };
