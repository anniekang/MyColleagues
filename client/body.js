const React = require('react');
const { connect } = require('react-redux');
const NewEmployee = require('./new-employee')
const ViewEmployee = require('./view-employee')


const Body = ({ currentView }) => {
  console.log(currentView)
  switch (currentView) {
    case 'edit-profile':
      return <NewEmployee/>;
    case 'profile':
      return <ViewEmployee/>;
  }
}

const mapStatetoProps = ({ currentView }) => ({ currentView })

module.exports = connect(mapStatetoProps)(Body)
