export const sanitizeText = (text) => {
  if (!text) return "";

  return text
    .replace(/\r\n|\r|\n/g, " ") // Remove newlines
    .replace(/\t/g, " ") // Remove tabs
    .replace(/\s\s+/g, " ") // Collapse multiple spaces
    .replace(/[•·●]/g, "") // Remove bullet dots
    .replace(/[^\x20-\x7E\n]/g, " ") // Remove non-ASCII weird symbols
    .replace(/\"/g, "'") // Replace double quotes
    .trim(); // Trim beginning/end spaces
};
