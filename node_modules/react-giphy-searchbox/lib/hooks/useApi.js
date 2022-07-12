'use strict';

exports.__esModule = true;

var _react = require('react');

var _dataFetchReducer = require('../reducers/dataFetchReducer');

var _dataFetchReducer2 = _interopRequireDefault(_dataFetchReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useApi = function useApi() {
  var _useReducer = (0, _react.useReducer)(_dataFetchReducer2.default, {
    loading: false,
    error: false,
    data: [],
    lastPage: false
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var fetchImages = function fetchImages(url, isMore) {
    if (isMore) {
      dispatch({ type: 'FETCH_MORE_INIT' });
    } else {
      dispatch({ type: 'FETCH_INIT' });
    }

    fetch(url).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          throw json;
        });
      }

      return response.json();
    }).then(function (response) {
      if (!response.pagination) {
        return dispatch({ type: 'FETCH_FAILURE' });
      }

      if (isMore) {
        return dispatch({
          type: 'FETCH_MORE_SUCCESS',
          payload: response.data,
          pagination: response.pagination
        });
      }

      return dispatch({
        type: 'FETCH_SUCCESS',
        payload: response.data,
        pagination: response.pagination
      });
    }).catch(function () {
      dispatch({ type: 'FETCH_FAILURE' });
    });
  };

  return [state, fetchImages];
};

exports.default = useApi;
module.exports = exports['default'];