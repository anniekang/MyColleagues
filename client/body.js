const React = require('react');
const { connect } = require('react-redux');
const EditEmployee = require('./edit-employee')
const ViewEmployee = require('./view-employee')
const ViewOrg = require('./view-org')
const OrgSearchEmployee = require('./org-search-employee')


const Body = ({ currentView }) => {
  switch (currentView) {
    case 'org-search-employee':
      return <OrgSearchEmployee/>;
    case 'edit-profile':
      return <EditEmployee/>;
    case 'profile':
      return <ViewEmployee/>;
    case 'org-chart':
      return <ViewOrg/>;
    default:
      return <EditEmployee/>;
  }
};

const mapStatetoProps = ({ currentView }) => ({ currentView });

module.exports = connect(mapStatetoProps)(Body);
