import React from 'react';
import { useStyle } from '../../style';
import { styles } from './poweredByGiphyStyles';
import PoweredByGiphyLogo from '../../assets/PoweredByGiphyLogo';

var PoweredByGiphy = function PoweredByGiphy(_ref) {
  var image = _ref.image;

  useStyle('PoweredByGiphy', styles);

  return React.createElement(
    'div',
    { className: 'reactGiphySearchbox-poweredByGiphy' },
    image ? React.createElement('img', { src: image, alt: 'Powered by Giphy', 'data-testid': 'PoweredByGiphy' }) : React.createElement(PoweredByGiphyLogo, null)
  );
};

export default PoweredByGiphy;