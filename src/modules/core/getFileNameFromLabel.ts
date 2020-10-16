export const getFileNameFromLabel = (label: string): string => {
  const FILE_EXTENSION = "bak";
  const formattedLabel = label.replace(/ /gi, "_");
  const fileName = `${formattedLabel}.${FILE_EXTENSION}`;
  return fileName;
};
