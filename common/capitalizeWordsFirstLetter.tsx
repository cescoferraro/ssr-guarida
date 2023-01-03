export const capitalizeWordsFirstLetter = (mySentence?: string): string => {
  return (mySentence || "")
    .split(" ")
    .map((word) => {
      return word[0]?.toUpperCase() + word.substring(1);
    })
    .join(" ");
};
