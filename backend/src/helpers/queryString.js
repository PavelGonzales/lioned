export const createQueryString = (words = []) => {
  const maxLengthSting = 2000;
  
  let queryString = `${process.env.TRANSLATE_API_URL}?key=${process.env.TRANSLATE_API_KEY}&lang=ru`;
  let i;
  
  for (i = 0; queryString.length < maxLengthSting && words.length > i; i++) {
    queryString += `&text=${words[i]}`;
  }
  
  return {
    index: i,
    queryString
  };
};

export const createQueryStringArray = (externalWords = [], externalQueriesArray) => {
  let words = externalWords;
  let queriesArray = externalQueriesArray;
  
  if (!externalWords.length) {
    return queriesArray;
  }
  
  const wordsData = createQueryString(words);
  
  queriesArray.push(encodeURI(wordsData.queryString));
  
  return createQueryStringArray(words.slice(wordsData.index), queriesArray);
};