const orgSubmitted = () => {
  return { type: 'ORG_SUBMITTED' }
}

const orgDataReceived = () => {
  return { type: 'ORG_DATA_RECEIVED'}
}

const renderManager = response => {
  return { type: 'RENDER_MANAGER', response }
}

const renderEmployee = response => {
  return { type: 'RENDER_EMPLOYEE', response}
}

const renderPeers = response => {
  return { type: 'RENDER_PEERS', response}
}

const renderReports = response => {
  return { type: 'RENDER_REPORTS', response}
}

const renderOrgChart = org => {
  return dispatch => {
    dispatch(orgSubmitted());

    fetch(`/orgchart/${org.id}/${org.managerId}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        dispatch(orgDataReceived());
        const manager = response[0];
        const employee = [response[1]];
        const reports = response[3];
        const peers = response[2];

        dispatch(renderManager(manager));
        if (org.id != org.managerId){
          dispatch(renderEmployee(employee));
          dispatch(renderReports(reports));
        }
        dispatch(renderPeers(peers));
      })
  }
}


module.exports = { orgSubmitted, orgDataReceived, renderManager, renderEmployee, renderPeers, renderReports, renderOrgChart }
