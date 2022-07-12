'use strict';

exports.__esModule = true;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _bricks = require('bricks.js');

var _bricks2 = _interopRequireDefault(_bricks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MasonryLayout = function MasonryLayout(_ref) {
  var children = _ref.children,
      sizes = _ref.sizes;

  var container = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    var bricks = (0, _bricks2.default)({
      container: container.current,
      packed: 'data-packed',
      sizes: sizes,
      position: true
    });

    bricks.resize(true);

    if (_react.Children.count(children) > 0) {
      bricks.pack();
    }
  }, [children]);

  return React.createElement(
    'div',
    { ref: container, 'data-testid': 'MasonryLayoutContainer' },
    children
  );
}; /* eslint-disable import/no-duplicates */

exports.default = MasonryLayout;
module.exports = exports['default'];