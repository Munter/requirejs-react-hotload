require.config({
  paths: {
    JSXTransformer: 'bower_components/react/JSXTransformer',
    react: 'bower_components/react/react-with-addons',
    text: 'bower_components/requirejs-text/text',
    jsx: 'bower_components/requirejs-react-jsx/jsx'
  },


  jsx: {
    fileExtension: '.jsx',
    transformOptions: {
      harmony: true,
      inlineSourceMap: true
    }
  }
});

define(function (require) {
  'use strict';

  var React = require('react');
  var Incrementor = require('jsx!app');

  React.render(React.createElement(Incrementor), document.body);
});
