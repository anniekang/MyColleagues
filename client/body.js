const React = require('react');
const { connect } = require('react-redux');
const Home = require('./home')
const OrgSearchEmployee = require('./org-search-employee')
const ViewEmployee = require('./view-employee')
const EditEmployee = require('./edit-employee')
const ViewOrg = require('./view-org')


const Body = ({ currentView }) => {
  switch (currentView) {
    case 'home':
      return <Home/>;
    case 'org-search-employee':
      return <OrgSearchEmployee/>;
    case 'profile':
        return <ViewEmployee/>;
    case 'edit-profile':
      return <EditEmployee/>;
    case 'org-chart':
      return <ViewOrg/>;
    default:
      return <Home/>;
  }
};

const mapStatetoProps = ({ currentView }) => ({ currentView });

module.exports = connect(mapStatetoProps)(Body);
