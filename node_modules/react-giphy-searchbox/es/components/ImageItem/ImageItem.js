import React from 'react';
import { useStyle } from '../../style';
import { styles } from './imageItemStyles';


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

  useStyle('ImageItem', styles);

  return React.createElement(
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
    React.createElement('img', {
      'data-testid': 'ImageItemImage',
      width: item.images[imageRenditionName].width,
      height: item.images[imageRenditionName].height,
      alt: item.title,
      src: item.images[imageRenditionName][getUrl(imageRenditionFileType)],
      className: 'reactGiphySearchbox-image'
    })
  );
};

export default ImageItem;