define(function (require) {
  var React = require('react');

  var Incrementor = React.createClass({
    displayName: 'Incrementor',

    getInitialState: function () {
      return {
        count: 0
      };
    },

    componentDidMount: function () {
      setInterval(function () {
        this.setState({
          count: this.state.count += 1
        });
      }.bind(this), 100);
    },

    render: function () {
      return <h1>{this.state.count} bottles of beer on the wall</h1>
    }
  });

  return Incrementor;
});
