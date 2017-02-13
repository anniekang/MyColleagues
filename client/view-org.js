const React = require('react');
const OrgSearchEmployee = require ('./org-search-employee');
const OrgMain = require ('./org-main');
const OrgPeers = require ('./org-peers');
const OrgReports = require ('./org-reports');



const ViewOrg = () => {
  return (
    <div id='orgChart'>
      <OrgSearchEmployee/>
      <OrgMain/>
      <OrgReports/>
      <OrgPeers/>
    </div>
  )
};

module.exports = ViewOrg;
