const React = require('react');
const ReactDOM = require ('react-dom');
const { Provider } = require('react-redux');
const store = require('./store');
const App = require('./app');

ReactDOM.render(
  <Provider store={ store }>
      <App/>
  </Provider>,
  document.getElementById('app')
)
