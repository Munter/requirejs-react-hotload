'use strict';

var hotApi = require('react-hot-api');
var ReactMount;
var React;
var hotCache = {};

module.exports = {
  load: function (name, parentRequire, onLoad, config) {

    parentRequire([name, 'react'], function (component, localReact) {
      React = localReact;
      var makeHot = hotCache[name];

      if (!makeHot) {
        if (!ReactMount) {
          var ReactInternals;

          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && __REACT_DEVTOOLS_GLOBAL_HOOK__._reactRuntime) {
            ReactInternals = __REACT_DEVTOOLS_GLOBAL_HOOK__._reactRuntime;
          } else if (typeof React !== 'undefined' && React.__internals) {
            ReactInternals = React.__internals;
          }
          if (!ReactInternals) {
            throw new Error('Unsupported environment. You need version 0.5+ of React.');
          }

          ReactMount = ReactInternals.Mount;
        }

        // On the first run, we will get here
        makeHot = hotCache[name] = hotApi(function () {
          return ReactMount._instancesByReactRootID;
        }, React);
      }

      onLoad(makeHot(component));
    });

  },

  reload: function (name) {
    var makeHot = hotCache[name];

    function forceUpdateInstance(instance) {
      if (React.Component) {
        // React 0.13.x
        React.Component.prototype.forceUpdate.call(instance._instance);
      } else if (instance.forceUpdate) {
        // React 0.12.x
        instance.forceUpdate();
      }
    }


    var rootInstances = ReactMount._instancesByReactRootID || ReactMount._instancesByContainerID || {};
    var rootIds = Object.keys(rootInstances);


    name.split('!').map(function (part) {
      console.log(part);
      requirejs.undef(part);
    });
    requirejs.undef(name);

    require([name], function (component) {
      console.log('Refreshed', name, Date.now());

      makeHot(component);

      for (var i = 0; i < rootIds.length; i += 1) {
        var instance = rootInstances[rootIds[i]];
        forceUpdateInstance(instance);
      }
    });
  },

  cache: hotCache,
  ReactMount: ReactMount
};
