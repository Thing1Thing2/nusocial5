'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var _imageItemStyles = require('./imageItemStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUrl = function getUrl(fileType) {
  if (fileType === 'gif') {
    return 'url';
  }

  return fileType;
};


var ImageItem = function ImageItem(_ref) {
  var backgroundColor = _ref.backgroundColor,
      item = _ref.item,
      imageRenditionName = _ref.imageRenditionName,
      imageRenditionFileType = _ref.imageRenditionFileType,
      size = _ref.size,
      listItemClassName = _ref.listItemClassName,
      onSelect = _ref.onSelect;

  (0, _style.useStyle)('ImageItem', _imageItemStyles.styles);

  return _react2.default.createElement(
    'button',
    {
      'data-testid': 'ImageItemButton',
      type: 'button',
      className: 'reactGiphySearchbox-imageButton' + (listItemClassName ? ' ' + listItemClassName : ''),
      style: {
        backgroundColor: backgroundColor,
        width: size + 'px',
        height: item.images[imageRenditionName].height * size / item.images[imageRenditionName].width + 'px'
      },
      onClick: function onClick() {
        return onSelect(item);
      }
    },
    _react2.default.createElement('img', {
      'data-testid': 'ImageItemImage',
      width: item.images[imageRenditionName].width,
      height: item.images[imageRenditionName].height,
      alt: item.title,
      src: item.images[imageRenditionName][getUrl(imageRenditionFileType)],
      className: 'reactGiphySearchbox-image'
    })
  );
};

exports.default = ImageItem;
module.exports = exports['default'];