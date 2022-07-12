'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var _poweredByGiphyStyles = require('./poweredByGiphyStyles');

var _PoweredByGiphyLogo = require('../../assets/PoweredByGiphyLogo');

var _PoweredByGiphyLogo2 = _interopRequireDefault(_PoweredByGiphyLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PoweredByGiphy = function PoweredByGiphy(_ref) {
  var image = _ref.image;

  (0, _style.useStyle)('PoweredByGiphy', _poweredByGiphyStyles.styles);

  return _react2.default.createElement(
    'div',
    { className: 'reactGiphySearchbox-poweredByGiphy' },
    image ? _react2.default.createElement('img', { src: image, alt: 'Powered by Giphy', 'data-testid': 'PoweredByGiphy' }) : _react2.default.createElement(_PoweredByGiphyLogo2.default, null)
  );
};

exports.default = PoweredByGiphy;
module.exports = exports['default'];