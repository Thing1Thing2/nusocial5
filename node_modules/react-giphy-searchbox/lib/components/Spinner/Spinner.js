'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var _spinnerStyles = require('./spinnerStyles');

var _SpinnerIcon = require('../../assets/SpinnerIcon');

var _SpinnerIcon2 = _interopRequireDefault(_SpinnerIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = function Spinner(_ref) {
  var show = _ref.show,
      message = _ref.message,
      image = _ref.image;

  (0, _style.useStyle)('Spinner', _spinnerStyles.styles);

  return show && _react2.default.createElement(
    'div',
    { role: 'status', className: 'reactGiphySearchbox-spinnerWrapper' },
    _react2.default.createElement(
      'div',
      { className: 'reactGiphySearchbox-spinner', 'data-testid': 'Spinner' },
      image ? _react2.default.createElement('img', { src: image, alt: 'Loading icon' }) : _react2.default.createElement(_SpinnerIcon2.default, null)
    ),
    _react2.default.createElement(
      'div',
      {
        className: 'reactGiphySearchbox-spinnerText',
        'data-testid': 'SpinnerText'
      },
      message
    )
  );
};

exports.default = Spinner;
module.exports = exports['default'];