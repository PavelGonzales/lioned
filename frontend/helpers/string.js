export const pluralize = function pluralize(num, wordsArray) {
  var addWord = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var divisioner = num % 100;

  var addPrefix = function addPrefix(text) {
    return addWord ? num + '\xA0' + text : text;
  };

  if (!(wordsArray instanceof Array) || !wordsArray || wordsArray.length < 3) {
    return num;
  }

  if (divisioner >= 5 && divisioner <= 20) {
    return addPrefix(wordsArray[2]);
  } else {
    divisioner = divisioner % 10;

    if (divisioner === 1) {
      return addPrefix(wordsArray[0]);
    } else if (divisioner >= 2 && divisioner <= 4) {
      return addPrefix(wordsArray[1]);
    } else {
      return addPrefix(wordsArray[2]);
    }
  }
};

export default {
  pluralize
};
