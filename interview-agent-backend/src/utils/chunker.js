export const chunkText = (text) => {
  // Split by major resume sections
  const sections = text.split(
    /INTERNSHIP|PROJECTS|EDUCATION|SKILLS|LANGUAGE|CERTIFICATE|EXPERIENCE|PROFILE|SUMMARY/i
  );

  // Clean empty or small sections
  return sections.map((s) => s.trim()).filter((s) => s.length > 50);
};
