'use strict';

exports.__esModule = true;
exports.styles = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n  .reactGiphySearchbox-spinnerWrapper {\n    text-align: center;\n    padding-bottom: 10px;\n  }\n\n  .reactGiphySearchbox-spinner {\n    display: inline-block;\n    vertical-align: middle;\n    width: 20px;\n    height: 20px;\n    background-size: contain;\n    animation: spin 500ms linear infinite;\n  }\n\n  .reactGiphySearchbox-spinner img {\n    display: block;\n    width: 100%;\n  }\n\n  @keyframes spin {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n  /* https://hugogiraudel.com/2016/10/13/css-hide-and-seek/ */\n  .reactGiphySearchbox-spinnerText {\n    border: 0;\n    clip: rect(1px, 1px, 1px, 1px);\n    -webkit-clip-path: inset(50%);\n    clip-path: inset(50%);\n    height: 1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n    white-space: nowrap;\n  }\n'], ['\n  .reactGiphySearchbox-spinnerWrapper {\n    text-align: center;\n    padding-bottom: 10px;\n  }\n\n  .reactGiphySearchbox-spinner {\n    display: inline-block;\n    vertical-align: middle;\n    width: 20px;\n    height: 20px;\n    background-size: contain;\n    animation: spin 500ms linear infinite;\n  }\n\n  .reactGiphySearchbox-spinner img {\n    display: block;\n    width: 100%;\n  }\n\n  @keyframes spin {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n  /* https://hugogiraudel.com/2016/10/13/css-hide-and-seek/ */\n  .reactGiphySearchbox-spinnerText {\n    border: 0;\n    clip: rect(1px, 1px, 1px, 1px);\n    -webkit-clip-path: inset(50%);\n    clip-path: inset(50%);\n    height: 1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n    white-space: nowrap;\n  }\n']);

var _style = require('../../style');

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /* eslint-disable import/prefer-default-export */


var styles = exports.styles = (0, _style.css)(_templateObject);