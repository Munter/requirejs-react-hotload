'use strict';

var hotApi = require('react-hot-api');
var ReactMount = require('react/lib/ReactMount');
var hotCache = {};

module.exports = {
  load: function (name, parentRequire, onLoadNative, config) {

    parentRequire(name, function (component) {
      var makeHot = hotCache[name];

      if (!makeHot) {
        // On the first run, we will get here
        makeHot = hotCache[name] = hotApi(ReactMount);
      }

      return makeHot(component);
    });

  },

  refresh: function (name) {
    // Get hotloader instance from cache
    // Trigger a component reload
  }
};
