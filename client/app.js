const React = require('react');
const Header = require('./header');
const Body = require('./body');

const App = () => {
  return (
    <div className='container'>
      <div id='header' className='ui grid container'>
        <Header/>
      </div>
      <div id='body'>
        <Body/>
      </div>
    </div>
  )
};

module.exports = App;
