const CHAR_SETTING_NAME = "MSM_CHAR_TABLE";

function $(selector) {
  const elemArray = document.querySelectorAll(selector);
  const length = elemArray.length;
  if (length == 1) {
    const elem = document.querySelector(selector);
    return elem;
  } else if (length == 0) {
    return null;
  } else {
    return elemArray;
  }
}
