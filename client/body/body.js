const React = require('react');
const { connect } = require('react-redux');
const Home = require('./home');
const OrgSearchEmployee = require('./org-chart/org-search-employee');
const SearchCollaboration = require('./search-collaboration')
const ViewEmployee = require('./view-employee');
const EditEmployee = require('./edit-employee');
const ViewOrg = require('./org-chart/view-org');
const EditCollaboration = require('./edit-collaboration');


const Body = ({ currentView }) => {
  switch (currentView) {
    case 'home':
      return <Home/>;
    case 'org-search-employee':
      return <OrgSearchEmployee/>;
    case 'search-collaboration':
      return <SearchCollaboration/>;
    case 'profile':
      return <ViewEmployee/>;
    case 'edit-profile':
      return <EditEmployee/>;
    case 'org-chart':
      return <ViewOrg/>;
    case 'edit-collaboration':
      return <EditCollaboration/>;
    default:
      return <Home/>;
  }
};

const mapStatetoProps = ({ currentView }) => ({ currentView });


module.exports = connect(mapStatetoProps)(Body);
