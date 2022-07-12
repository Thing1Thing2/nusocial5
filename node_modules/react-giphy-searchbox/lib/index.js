'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInfiniteScroller = require('react-infinite-scroller');

var _reactInfiniteScroller2 = _interopRequireDefault(_reactInfiniteScroller);

var _style = require('./style');

var _indexStyles = require('./indexStyles');

var _SearchForm = require('./components/SearchForm/SearchForm');

var _SearchForm2 = _interopRequireDefault(_SearchForm);

var _ImageItem = require('./components/ImageItem/ImageItem');

var _ImageItem2 = _interopRequireDefault(_ImageItem);

var _PoweredByGiphy = require('./components/PoweredByGiphy/PoweredByGiphy');

var _PoweredByGiphy2 = _interopRequireDefault(_PoweredByGiphy);

var _MasonryLayout = require('./components/MasonryLayout/MasonryLayout');

var _MasonryLayout2 = _interopRequireDefault(_MasonryLayout);

var _Alert = require('./components/Alert/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Spinner = require('./components/Spinner/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _useSearchForm2 = require('./hooks/useSearchForm');

var _useSearchForm3 = _interopRequireDefault(_useSearchForm2);

var _useDebounce = require('./hooks/useDebounce');

var _useDebounce2 = _interopRequireDefault(_useDebounce);

var _useMedia = require('./hooks/useMedia');

var _useMedia2 = _interopRequireDefault(_useMedia);

var _useApi2 = require('./hooks/useApi');

var _useApi3 = _interopRequireDefault(_useApi2);

var _masonry = require('./utils/masonry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactGiphySearchBox = function ReactGiphySearchBox(_ref) {
  var apiKey = _ref.apiKey,
      autoFocus = _ref.autoFocus,
      gifListHeight = _ref.gifListHeight,
      gifPerPage = _ref.gifPerPage,
      imageBackgroundColor = _ref.imageBackgroundColor,
      imageRenditionFileType = _ref.imageRenditionFileType,
      imageRenditionName = _ref.imageRenditionName,
      library = _ref.library,
      listItemClassName = _ref.listItemClassName,
      listWrapperClassName = _ref.listWrapperClassName,
      loadingImage = _ref.loadingImage,
      masonryConfig = _ref.masonryConfig,
      messageError = _ref.messageError,
      messageLoading = _ref.messageLoading,
      messageNoMatches = _ref.messageNoMatches,
      onSearch = _ref.onSearch,
      onSelect = _ref.onSelect,
      poweredByGiphy = _ref.poweredByGiphy,
      poweredByGiphyImage = _ref.poweredByGiphyImage,
      rating = _ref.rating,
      searchFormClassName = _ref.searchFormClassName,
      searchPlaceholder = _ref.searchPlaceholder,
      wrapperClassName = _ref.wrapperClassName;

  (0, _style.useStyle)('Index', _indexStyles.styles);

  var _useSearchForm = (0, _useSearchForm3.default)(),
      query = _useSearchForm.query,
      handleInputChange = _useSearchForm.handleInputChange,
      handleSubmit = _useSearchForm.handleSubmit;

  var debouncedQuery = (0, _useDebounce2.default)(query, 500);

  var apiEndpoint = query ? 'search' : 'trending';
  var apiUrl = function apiUrl(offset) {
    return 'https://api.giphy.com/v1/' + library + '/' + apiEndpoint + '?api_key=' + apiKey + '&limit=' + gifPerPage + '&rating=' + rating + '&offset=' + offset + '&q=' + query;
  };

  var _useApi = (0, _useApi3.default)(),
      _useApi$ = _useApi[0],
      data = _useApi$.data,
      loading = _useApi$.loading,
      error = _useApi$.error,
      lastPage = _useApi$.lastPage,
      fetchImages = _useApi[1];

  var masonryConfigMatchMedia = (0, _useMedia2.default)((0, _masonry.getMediaBreakpoints)(masonryConfig), (0, _masonry.getMasonryConfigExceptLast)(masonryConfig), (0, _masonry.getDefaultMasonryConfig)(masonryConfig));

  // Fetch Giphy Api on component mount and on search query change

  var _useState = (0, _react.useState)(true),
      firstRun = _useState[0],
      setFirstRun = _useState[1];

  var isFirstRun = (0, _react.useRef)(true);
  (0, _react.useEffect)(function () {
    fetchImages(apiUrl(0));
    onSearch(query);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      setFirstRun(false);
    }
  }, [debouncedQuery]);

  return _react2.default.createElement(
    'div',
    {
      className: 'reactGiphySearchbox-componentWrapper' + (wrapperClassName ? ' ' + wrapperClassName : ''),
      style: { width: (0, _masonry.getComponentWrapperWidth)(masonryConfigMatchMedia) }
    },
    _react2.default.createElement(_SearchForm2.default, {
      value: query,
      setValue: handleInputChange,
      onSubmit: handleSubmit,
      loadingData: loading,
      searchFormClassName: searchFormClassName,
      placeholder: searchPlaceholder,
      autoFocus: autoFocus
    }),
    _react2.default.createElement(
      'div',
      {
        className: 'reactGiphySearchbox-listWrapper' + (listWrapperClassName ? ' ' + listWrapperClassName : ''),
        style: { height: gifListHeight }
      },
      _react2.default.createElement(_Alert2.default, {
        show: data.length === 0 && !loading && !error && !firstRun,
        message: messageNoMatches
      }),
      _react2.default.createElement(_Alert2.default, { show: error, message: messageError }),
      _react2.default.createElement(_Spinner2.default, { show: loading, message: messageLoading, image: loadingImage }),
      _react2.default.createElement(
        _reactInfiniteScroller2.default,
        {
          pageStart: 0,
          loadMore: function loadMore(page) {
            return fetchImages(apiUrl(page * gifPerPage), true);
          },
          hasMore: !loading && !lastPage,
          useWindow: false,
          initialLoad: false,
          loader: !firstRun && _react2.default.createElement(
            'div',
            { key: 'loading' },
            _react2.default.createElement(_Spinner2.default, {
              show: loading,
              message: messageLoading,
              image: loadingImage
            })
          )
        },
        data.length > 0 && _react2.default.createElement(
          _MasonryLayout2.default,
          { sizes: masonryConfig },
          data.map(function (item) {
            return _react2.default.createElement(_ImageItem2.default, {
              item: item,
              size: masonryConfigMatchMedia.imageWidth,
              key: item.id,
              listItemClassName: listItemClassName,
              onSelect: onSelect,
              backgroundColor: imageBackgroundColor,
              imageRenditionName: imageRenditionName,
              imageRenditionFileType: imageRenditionFileType
            });
          })
        )
      )
    ),
    poweredByGiphy && _react2.default.createElement(_PoweredByGiphy2.default, { image: poweredByGiphyImage })
  );
};


ReactGiphySearchBox.defaultProps = {
  autoFocus: false,
  gifListHeight: '300px',
  gifPerPage: 20,
  imageBackgroundColor: '#eee',
  imageRenditionFileType: 'gif',
  imageRenditionName: 'fixed_width_downsampled',
  library: 'gifs',
  listItemClassName: '',
  listWrapperClassName: '',
  loadingImage: undefined,
  masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
  messageError: 'Oops! Something went wrong. Please, try again.',
  messageLoading: 'Loading...',
  messageNoMatches: 'No matches found.',
  onSearch: function onSearch() {},
  poweredByGiphy: true,
  poweredByGiphyImage: undefined,
  rating: 'g',
  searchFormClassName: '',
  searchPlaceholder: 'Search for GIFs',
  wrapperClassName: ''
};

exports.default = ReactGiphySearchBox;
module.exports = exports['default'];