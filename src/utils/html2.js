import React from "react";
import {
  createHTML,
  copyFromAssets,
  pickImage,
  processLocalImage,
} from "./helpers";
import appTheme from "../constants/theme";

export const simpleHtml =
  (
    sholudRemovePageMargin = false,
    productsToSell,
    customer,
    distributor,
    driver,
    getTotalPrice,
    getEmptiesPrice
  ) =>
  () =>
    createHTML({
      content: `
      <section 
      style="display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 40px;
      margin-bottom: 50px">
        <h5 style="
            font-size: 20px;
              font-weight: 'bold';
              margin-bottom:1px">${distributor?.company_name}
             </h5>
        <p style="color: grey;
        margin-bottom: 1px">${distributor?.address}</p>
        <p style="   color: grey;
        margin-bottom: 5px">
          <span>Tel:</span>
          <span>${distributor?.Owner_Phone}</span>
        </p>
      </section>
      <section style=" display: flex; justify-content: space-between;
      padding-right: 40px;
      padding-left: 40px">
     
        <article>
          <h1 style=" margin-bottom: 5px">Invoice</h1>
          <div style="display: flex" >
              <p style="margin-bottom: 5px">Date:</p>&nbsp;
              <p style="margin-bottom: 5px">${new Date().toLocaleDateString()}</p>    
          </div>
          <div style="display: flex" >
              <p style="margin-bottom: 5px">Invoive:</p>&nbsp;
              <p style="margin-bottom: 5px">#0317</p></p>
          </div>
          <div style="display: flex" >
              <p style="margin-bottom: 5px">Order no:</p>&nbsp;
              <p style="margin-bottom: 5px">${customer?.id}</p>
          </div>
          <div style="display: flex" >
              <p style="margin-bottom: 5px">Salesman:</p>&nbsp;
              <p style="margin-bottom: 5px">${driver?.name}</p>
          </div>
        </article>
  
      <div>
          <h3>SOLD TO</h3>
          <div>
              <p>${customer?.CUST_Name}</p>
              <p>${customer?.country}</p>     
              <p>Lagos</p> 
              <p><span>Tel:</span>&nbsp;<span>${customer?.phoneNumber}
              </span> </p>
          </div>
         
      </div>
      </section>
      <section>
          <table style="width: 100%;
          margin-top: 50px;
          margin-left: 20px">
              <thead>
                <tr>
                  <th style="text-align: left;
                  padding: 1rem 1rem;
                  color: #000;
                  font-size: 18px" >No</th>
                  <th style="text-align: left;
                  padding: 1rem 1rem;
                  color: #000;
                  font-size: 18px">Product Description</th>
                  <th style="text-align: left;
                  padding: 1rem 1rem;
                  color: #000;
                  font-size: 18px">Quantity</th>
                  <th style="text-align: left;
                  padding: 1rem 1rem;
                  color: #000;
                  font-size: 18px">Unit Price</th>
                  <th style="text-align: left;
                  padding: 1rem 1rem;
                  color: #000;
                  font-size: 18px">Amount</th>
                </tr>
               </thead>
               <tbody>

                 ${productsToSell.map(
                   (item, index) =>
                     `<tr>
                 <td style="padding: 1rem 1rem">${index + 1}</td>
                 <td style="padding: 1rem 1rem">${item?.brand} ${item?.sku}</td>
                 <td style="padding: 1rem 1rem">${item?.quantity}</td>
                 <td style="padding: 1rem 1rem">\u20A6${item?.price}</td>
                 <td style="padding: 1rem 1rem">\u20A6${item?.price}</td>
               </tr>`
                 )}


              </tbody>
            </table>
  
            <article style="background-color:#dadee3;
            padding-top: 0px;
            padding-left: 40px;
            padding-right: 40px;
            padding-bottom: 20px">
                <div style="display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-size: 20px;
                border-bottom: 2px solid black"><p>Additional Information</p>
                  <p>Grand Total:</p>
              </div>
  
             
              <div style="display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid black;"> 
                  <div>
                      <div style="margin-bottom: 5px">
                          <span style="font-size: 18px">Subtotal:</span><span> \u20A6${getTotalPrice()}</span>
                      </div>
                      <div style="margin-bottom: 5px">
                          <span  style="font-size: 18px">Empties:</span><span> \u20A6${getEmptiesPrice()}</span>
                      </div>
                      <div style="margin-bottom: 5px">
                          <span  style="font-size: 18px">Tax:</span><span>N0.00</span>
                      </div>
                  </div>
  
                  <div>
                      <h5 style=" font-size: 30px">\u20A6${getTotalPrice()}</h5>
                  </div>
              </div>
            </article>
      </section>
    `,
      sholudRemovePageMargin,
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
