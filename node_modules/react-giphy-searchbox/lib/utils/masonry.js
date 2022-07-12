"use strict";

exports.__esModule = true;
var getMasonryConfig = exports.getMasonryConfig = function getMasonryConfig(masonryConfig) {
  return masonryConfig.map(function (c) {
    return {
      columns: c.columns,
      imageWidth: c.imageWidth,
      gutter: c.gutter
    };
  }).reverse();
};

var getMasonryConfigExceptLast = exports.getMasonryConfigExceptLast = function getMasonryConfigExceptLast(masonryConfig) {
  var returnedMasonryConfig = getMasonryConfig(masonryConfig);

  return returnedMasonryConfig.slice(0, returnedMasonryConfig.length - 1);
};

var getDefaultMasonryConfig = exports.getDefaultMasonryConfig = function getDefaultMasonryConfig(masonryConfig) {
  var returnedMasonryConfig = getMasonryConfig(masonryConfig);

  return returnedMasonryConfig[returnedMasonryConfig.length - 1];
};

var getMediaBreakpoints = exports.getMediaBreakpoints = function getMediaBreakpoints(masonryConfig) {
  return (
    // Export in a reverse order `mp` property in an array and filter out undefined items (the `mq` param
    // for first array item is undefined since you don't have to specify it).
    masonryConfig.map(function (c) {
      return c.mq && "(min-width: " + c.mq + ")";
    }).filter(function (i) {
      return i != null;
    }).reverse()
  );
};

var getComponentWrapperWidth = exports.getComponentWrapperWidth = function getComponentWrapperWidth(masonryConfig) {
  return masonryConfig.imageWidth * masonryConfig.columns + masonryConfig.gutter * (masonryConfig.columns - 1);
};