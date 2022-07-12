/* eslint-disable import/prefer-default-export */
export var css = function css(strings) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return strings.reduce(function (acc, string, index) {
    return acc + string + (index < args.length ? args[index] : '');
  }, '');
};