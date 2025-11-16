import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");

const PDFParse = pdfParseModule.PDFParse;

export const parsePDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);

  const pdfParser = new PDFParse({ data: dataBuffer });

  const result = await pdfParser.getText();
  return result.text;
};
