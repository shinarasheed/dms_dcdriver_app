import {
  createHTML,
  copyFromAssets,
  pickImage,
  processLocalImage,
} from "./helpers";
import appTheme from "../constants/theme";

export const simpleHtml =
  (sholudRemovePageMargin = false) =>
  () =>
    createHTML({
      content: `
      <section class="header">
      <h5>KMS Nigeria Limited</h5>
      <p>22, Osolo Road, Ajao Estate, Lagos</p>
      <p>
        <span>Tel:</span>
        <span>08023456789</span>
      </p>
    </section>
    <section class="invoice">
   
      <article>
        <h1>Invoice</h1>
        <div >
            <p>Date:</p>&nbsp;
            <p>June 3, 2020</p>      
        </div>
        <div>
            <p>Invoive:</p>&nbsp;
            <p>#0317</p></p>
        </div>
        <div>
            <p>Order no:</p>&nbsp;
            <p>484939</p>
        </div>
        <div>
            <p>Salesman:</p>&nbsp;
            <p>Daniel ugbo</p>
        </div>
      </article>

    <div>
        <h3>SOLD TO</h3>
        <div>
            <p>Olat Stores Limited</p>
            <p>343, Oshodi - Isolo Expressway</p>     
            <p>Lagos</p> 
            <p><span>Tel:</span>&nbsp;<span>08123456789</span> </p>
        </div>
       
    </div>
    </section>
    <$>
        <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
             </thead>
             <tbody>
               <tr>
                   <td>1. </td>
                 <td>Bulweiser 600 ml x 12(RB)</td>
                 <td>1</td>
                 <td>N12, 345.00</td>
                 <td>N12,345.00</td>
               </tr>
               <tr>
                <td>2. </td>
              <td>Bulweiser 600 ml x 12(RB)</td>
              <td>1</td>
              <td>N12, 345.00</td>
              <td>N12,345.00</td>
            </tr>
            <tr>
                <td>3. </td>
              <td>Bulweiser 600 ml x 12(RB)</td>
              <td>1</td>
              <td>N12, 345.00</td>
              <td>N12,345.00</td>
            </tr>
            <tr>
                <td>4. </td>
              <td>Bulweiser 600 ml x 12(RB)</td>
              <td>1</td>
              <td>N12, 345.00</td>
              <td>N12,345.00</td>
            </tr>
            <tr>
                <td>5. </td>
              <td>Bulweiser 600 ml x 12(RB)</td>
              <td>1</td>
              <td>N12, 345.00</td>
              <td>N12,345.00</td>
            </tr>
            <tr>
                <td>6. </td>
              <td>Bulweiser 600 ml x 12(RB)</td>
              <td>1</td>
              <td>N12, 345.00</td>
              <td>N12,345.00</td>
            </tr>
            <tr>
                <td>7. </td>
              <td>Bulweiser 600 ml x 12(RB)</td>
              <td>1</td>
              <td>N12, 345.00</td>
              <td>N12,345.00</td>
            </tr>
            <tr>
                <td>8. </td>
              <td>Bulweiser 600 ml x 12(RB)</td>
              <td>1</td>
              <td>N12, 345.00</td>
              <td>N12,345.00</td>
            </tr>      
            </tbody>
          </table>

          <article class="summary">
              <div class="info"><p>Additional Information</p>
                <p>Grand Total:</p>
            </div>

           
            <div class="subContainer"> 
                <div>
                    <div class="sub">
                        <span>Subtotal:</span><span> N98, 760. 00</span>
                    </div>
                    <div class="sub">
                        <span>Empties:</span><span> N0.00</span>
                    </div>
                    <div class="sub">
                        <span>Tax:</span><span> N0.00</span>
                    </div>
                </div>

                <div>
                    <h5 class="totalPrice">N98,760.00</h5>
                </div>
            </div>
          </article>${
            sholudRemovePageMargin ? "I'm without page margin!" : ""
          }</section>
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
