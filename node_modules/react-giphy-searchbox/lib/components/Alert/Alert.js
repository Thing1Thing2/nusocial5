'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var _alertStyles = require('./alertStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alert = function Alert(_ref) {
  var show = _ref.show,
      message = _ref.message;

  (0, _style.useStyle)('Alert', _alertStyles.styles);

  return show && _react2.default.createElement(
    'p',
    {
      role: 'alert',
      'data-testid': 'Alert',
      className: 'reactGiphySearchbox-message'
    },
    message
  );
};
exports.default = Alert;
module.exports = exports['default'];