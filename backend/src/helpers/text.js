export const countWords = (htmlText) => {
  let text = htmlText;
  text = text.replace(/<(pre|code).*?>(.*?)<\/(pre|code)>/g, ' ');
  text = text.replace(/<[^>]*>/g, ' ');
  text = text.replace(/[^a-zA-Zа-яА-Я\'’–—‒―-]/g, ' ');
  text = text.replace(/\s+/g, ' ');
  text = text.toLowerCase().trim();

  const textArray = text.split(' ');
  const uniqTextArray = [...new Set(textArray)];

  return {
    total: textArray.length,
    uniq: uniqTextArray.length,
    uniq_words: uniqTextArray
  };
};