import { Platform, Alert } from "react-native";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import appTheme from "../constants/theme";
import { shareAsync } from "expo-sharing";

export const createHTML = ({
  content = "",
  styles = "",
  sholudRemovePageMargin = true,
} = {}) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Example PDF</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap');

                html {
                    height: 100%;
                }
                body {
                    font-size: 16px;
                    margin: 0;
                    color: ${appTheme.COLORS.black};
                    min-height: 100%;
                    overflow-x: hidden;
                    // font-family: 'Red Hat Display', sans-serif;
                }

                * {
                    box-sizing: border-box;
                }

                @page {
                    ${sholudRemovePageMargin ? "margin: 0;" : ""}
                    background: red;
                
                .img-fluid {
                    width: 100%;
                    height: auto;
                }

                .container {
                    padding: 15px;
                }

                ${styles}
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;
};

// export const createAndSavePDF = async (html) => {
//   try {
//     let isShared = false;
//     const { uri } = await Print.printToFileAsync({ html });
//     if (Platform.OS === "ios") {
//       isShared = await shareAsync(uri, {
//         UTI: ".pdf",
//         mimeType: "application/pdf",
//       });
//     } else {
//       const permission = await MediaLibrary.requestPermissionsAsync();

//       if (permission.granted) {
//         await MediaLibrary.createAssetAsync(uri);
//         isShared = true;
//       }
//     }

//     if (!isShared) {
//       throw new Error("Something went wrong...");
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const createAndSavePDF = async (html) => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  const { uri } = await Print.printToFileAsync({
    html,
  });

  // Alert.alert("File has been saved to:");
  await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
};

export const copyFromAssets = async (asset) => {
  try {
    await Asset.loadAsync(asset);
    const { localUri } = Asset.fromModule(asset);

    return localUri;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const pickImage = async (fromCamera = false) => {
  try {
    const permissionPrefix = fromCamera ? "Camera" : "CameraRoll";
    const launchPrefix = fromCamera ? "Camera" : "ImageLibrary";
    const options = { allowsEditing: true, aspect: [1, 1] };

    let hasAccess;
    const { granted: alreadyHasAccess } = await ImagePicker[
      `get${permissionPrefix}PermissionsAsync`
    ]();
    hasAccess = alreadyHasAccess;
    if (!hasAccess) {
      const { granted: requestedHasAccess } = await ImagePicker[
        `request${permissionPrefix}PermissionsAsync`
      ]();
      hasAccess = requestedHasAccess;
    }

    if (hasAccess) {
      return await ImagePicker[`launch${launchPrefix}Async`](options);
    }

    throw { message: "Permission denied" };
  } catch (error) {
    console.log(error);
    return { cancelled: true };
  }
};

export const processLocalImage = async (
  imageUri = "",
  optimize = false,
  actions = []
) => {
  try {
    const format = "png";

    const options = { format, base64: Platform.OS === "ios" };
    const allActions = actions || [];

    if (optimize) {
      options.compress = 0.1;
      allActions.push({
        resize: {
          width: 400,
        },
      });
    }

    const { uri, base64 } = await ImageManipulator.manipulateAsync(
      imageUri,
      allActions,
      options
    );

    return Platform.OS === "ios"
      ? `data:image/${format};base64,${base64}`
      : uri;
  } catch (error) {
    console.log(error);
    return imageUri;
  }
};
