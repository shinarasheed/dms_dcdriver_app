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
      
 
    //   content


     </div>
    </section>
    
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
