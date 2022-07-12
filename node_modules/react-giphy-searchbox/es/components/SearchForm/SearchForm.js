import React from 'react';
import { useStyle } from '../../style';
import { styles } from './searchFormStyles';

var SearchForm = function SearchForm(_ref) {
  var onSubmit = _ref.onSubmit,
      placeholder = _ref.placeholder,
      searchFormClassName = _ref.searchFormClassName,
      setValue = _ref.setValue,
      value = _ref.value,
      autoFocus = _ref.autoFocus;

  useStyle('SearchForm', styles);

  return React.createElement(
    'form',
    {
      'data-testid': 'SearchFormForm',
      onSubmit: onSubmit,
      autoComplete: 'off',
      className: 'reactGiphySearchbox-searchForm-form' + (searchFormClassName ? ' ' + searchFormClassName : '')
    },
    React.createElement('input', {
      'data-testid': 'SearchFormInput',
      type: 'text',
      placeholder: placeholder,
      onChange: setValue,
      value: value,
      name: 'search',
      className: 'reactGiphySearchbox-searchForm-input'
      // eslint-disable-next-line jsx-a11y/no-autofocus
      , autoFocus: autoFocus
    })
  );
};
export default SearchForm;