"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpinnerIcon = function SpinnerIcon() {
  return _react2.default.createElement(
    "svg",
    {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      x: "0px",
      y: "0px",
      viewBox: "0 0 100 100",
      xmlSpace: "preserve"
    },
    _react2.default.createElement("path", {
      fill: "#939393",
      className: "st0",
      d: "M50,99c-6.6,0-13-1.3-19-3.8c-2-0.9-3-3.2-2.1-5.2c0.9-2,3.2-3,5.2-2.1c5,2.1,10.4,3.2,15.9,3.2 c22.6,0,41-18.4,41-41S72.6,9,50,9c-2.2,0-4-1.8-4-4s1.8-4,4-4c27,0,49,22,49,49S77,99,50,99z"
    })
  );
};

exports.default = SpinnerIcon;
module.exports = exports["default"];