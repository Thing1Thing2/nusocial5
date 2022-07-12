import React from 'react';
import { useStyle } from '../../style';
import { styles } from './spinnerStyles';
import SpinnerIcon from '../../assets/SpinnerIcon';

var Spinner = function Spinner(_ref) {
  var show = _ref.show,
      message = _ref.message,
      image = _ref.image;

  useStyle('Spinner', styles);

  return show && React.createElement(
    'div',
    { role: 'status', className: 'reactGiphySearchbox-spinnerWrapper' },
    React.createElement(
      'div',
      { className: 'reactGiphySearchbox-spinner', 'data-testid': 'Spinner' },
      image ? React.createElement('img', { src: image, alt: 'Loading icon' }) : React.createElement(SpinnerIcon, null)
    ),
    React.createElement(
      'div',
      {
        className: 'reactGiphySearchbox-spinnerText',
        'data-testid': 'SpinnerText'
      },
      message
    )
  );
};

export default Spinner;