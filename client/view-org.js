const React = require('react');
const OrgEmployee = require ('./org-employee');
const OrgMain = require ('./org-main');
const OrgPeers = require ('./org-peers');
const OrgReports = require ('./org-reports');



const ViewOrg = () => {
  return (
    <div id='orgChart'>
      <OrgEmployee/>
      <OrgMain/>
      <OrgReports/>
      <OrgPeers/>
    </div>
  )
};

module.exports = ViewOrg;
