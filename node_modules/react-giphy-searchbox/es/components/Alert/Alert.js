import React from 'react';
import { useStyle } from '../../style';
import { styles } from './alertStyles';

var Alert = function Alert(_ref) {
  var show = _ref.show,
      message = _ref.message;

  useStyle('Alert', styles);

  return show && React.createElement(
    'p',
    {
      role: 'alert',
      'data-testid': 'Alert',
      className: 'reactGiphySearchbox-message'
    },
    message
  );
};

export default Alert;