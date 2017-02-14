const React = require('react');
const Header = require('./header');
const ITDashboard = require('./it-dashboard')
const Body = require('./body');

const App = () => {
  return (
    <div className='container'>
      <div id='header' className='ui grid container'>
        <Header/>
      </div>
      <ITDashboard/>
      <div id='body'>
        <Body/>
      </div>
    </div>
  )
};

module.exports = App;
