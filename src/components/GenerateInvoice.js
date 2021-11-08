import React from "react";
import { createAndSavePDF } from "../utils/helpers";
import { simpleHtml } from "../utils/html";

export const createPdf = (htmlFactory) => async () => {
  try {
    const html = await htmlFactory();
    if (html) {
      await createAndSavePDF(html);
      Alert.alert(
        "Success!",
        "Invoice has been successfully generated and saved!"
      );
    }
  } catch (error) {
    Alert.alert("Error", error.message || "Something went wrong...");
  }
};
