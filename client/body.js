const React = require('react');
const { connect } = require('react-redux');
const NewEmployee = require('./new-employee')

const Body = ({ currentView }) => {
  switch (currentView) {
    case 'edit-profile':
      return <NewEmployee/>;

  }
}

const mapStatetoProps = ({ currentView }) => ({ currentView })

module.exports = connect(mapStatetoProps)(Body)
