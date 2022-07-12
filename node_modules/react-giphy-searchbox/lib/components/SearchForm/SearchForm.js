'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var _searchFormStyles = require('./searchFormStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchForm = function SearchForm(_ref) {
  var onSubmit = _ref.onSubmit,
      placeholder = _ref.placeholder,
      searchFormClassName = _ref.searchFormClassName,
      setValue = _ref.setValue,
      value = _ref.value,
      autoFocus = _ref.autoFocus;

  (0, _style.useStyle)('SearchForm', _searchFormStyles.styles);

  return _react2.default.createElement(
    'form',
    {
      'data-testid': 'SearchFormForm',
      onSubmit: onSubmit,
      autoComplete: 'off',
      className: 'reactGiphySearchbox-searchForm-form' + (searchFormClassName ? ' ' + searchFormClassName : '')
    },
    _react2.default.createElement('input', {
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
exports.default = SearchForm;
module.exports = exports['default'];