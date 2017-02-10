const React = require('react');
const { connect } = require('react-redux');
const EditEmployee = require('./edit-employee')
const ViewEmployee = require('./view-employee')


const Body = ({ currentView }) => {
  console.log(currentView)
  switch (currentView) {
    case 'edit-profile':
      return <EditEmployee/>;
    case 'profile':
      return <ViewEmployee/>;
  }
}

const mapStatetoProps = ({ currentView }) => ({ currentView })

module.exports = connect(mapStatetoProps)(Body)
