import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useStyle } from './style';
import { styles } from './indexStyles';
import SearchForm from './components/SearchForm/SearchForm';
import ImageItem from './components/ImageItem/ImageItem';
import PoweredByGiphy from './components/PoweredByGiphy/PoweredByGiphy';
import MasonryLayout from './components/MasonryLayout/MasonryLayout';
import Alert from './components/Alert/Alert';
import Spinner from './components/Spinner/Spinner';
import useSearchForm from './hooks/useSearchForm';
import useDebounce from './hooks/useDebounce';
import useMedia from './hooks/useMedia';
import useApi from './hooks/useApi';
import { getComponentWrapperWidth, getDefaultMasonryConfig, getMasonryConfigExceptLast, getMediaBreakpoints } from './utils/masonry';

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

  useStyle('Index', styles);

  var _useSearchForm = useSearchForm(),
      query = _useSearchForm.query,
      handleInputChange = _useSearchForm.handleInputChange,
      handleSubmit = _useSearchForm.handleSubmit;

  var debouncedQuery = useDebounce(query, 500);

  var apiEndpoint = query ? 'search' : 'trending';
  var apiUrl = function apiUrl(offset) {
    return 'https://api.giphy.com/v1/' + library + '/' + apiEndpoint + '?api_key=' + apiKey + '&limit=' + gifPerPage + '&rating=' + rating + '&offset=' + offset + '&q=' + query;
  };

  var _useApi = useApi(),
      _useApi$ = _useApi[0],
      data = _useApi$.data,
      loading = _useApi$.loading,
      error = _useApi$.error,
      lastPage = _useApi$.lastPage,
      fetchImages = _useApi[1];

  var masonryConfigMatchMedia = useMedia(getMediaBreakpoints(masonryConfig), getMasonryConfigExceptLast(masonryConfig), getDefaultMasonryConfig(masonryConfig));

  // Fetch Giphy Api on component mount and on search query change

  var _useState = useState(true),
      firstRun = _useState[0],
      setFirstRun = _useState[1];

  var isFirstRun = useRef(true);
  useEffect(function () {
    fetchImages(apiUrl(0));
    onSearch(query);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      setFirstRun(false);
    }
  }, [debouncedQuery]);

  return React.createElement(
    'div',
    {
      className: 'reactGiphySearchbox-componentWrapper' + (wrapperClassName ? ' ' + wrapperClassName : ''),
      style: { width: getComponentWrapperWidth(masonryConfigMatchMedia) }
    },
    React.createElement(SearchForm, {
      value: query,
      setValue: handleInputChange,
      onSubmit: handleSubmit,
      loadingData: loading,
      searchFormClassName: searchFormClassName,
      placeholder: searchPlaceholder,
      autoFocus: autoFocus
    }),
    React.createElement(
      'div',
      {
        className: 'reactGiphySearchbox-listWrapper' + (listWrapperClassName ? ' ' + listWrapperClassName : ''),
        style: { height: gifListHeight }
      },
      React.createElement(Alert, {
        show: data.length === 0 && !loading && !error && !firstRun,
        message: messageNoMatches
      }),
      React.createElement(Alert, { show: error, message: messageError }),
      React.createElement(Spinner, { show: loading, message: messageLoading, image: loadingImage }),
      React.createElement(
        InfiniteScroll,
        {
          pageStart: 0,
          loadMore: function loadMore(page) {
            return fetchImages(apiUrl(page * gifPerPage), true);
          },
          hasMore: !loading && !lastPage,
          useWindow: false,
          initialLoad: false,
          loader: !firstRun && React.createElement(
            'div',
            { key: 'loading' },
            React.createElement(Spinner, {
              show: loading,
              message: messageLoading,
              image: loadingImage
            })
          )
        },
        data.length > 0 && React.createElement(
          MasonryLayout,
          { sizes: masonryConfig },
          data.map(function (item) {
            return React.createElement(ImageItem, {
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
    poweredByGiphy && React.createElement(PoweredByGiphy, { image: poweredByGiphyImage })
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

export default ReactGiphySearchBox;