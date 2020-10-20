export const getFileNameFromLabel = (label: string): string => {
  const FILE_EXTENSION = "bak";
  const formattedLabel = label.replace(/ /gi, "_");
  const labelContainsFileExtension = label.includes(".");
  let fileName = formattedLabel;
  if (!labelContainsFileExtension) {
    fileName += `.${FILE_EXTENSION}`;
  }
  return fileName;
};
