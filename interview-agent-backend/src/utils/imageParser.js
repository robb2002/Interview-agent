import Tesseract from "tesseract.js";

export const parseImage = async (filePath) => {
  const result = await Tesseract.recognize(filePath, "eng");
  return result.data.text;
};
