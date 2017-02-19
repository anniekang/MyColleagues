const React = require('react');
const OrgManager = require ('./org-manager');
const OrgSearchEmployee = require ('./org-search-employee');
const OrgPeers = require ('./org-peers');
const OrgReports = require ('./org-reports');


const ViewOrg = () => {
  return (
    <div id='orgChart'>
      <OrgManager/>
      <OrgSearchEmployee/>
      <OrgReports/>
      <OrgPeers/>
    </div>
  )
};

module.exports = ViewOrg;
