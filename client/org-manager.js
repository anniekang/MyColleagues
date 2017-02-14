const React = require('react');
const { connect } = require('react-redux');
const { renderProfile, renderOrgChart } = require('./actions');


const OrgManager = ({ currentView, searchResults, viewOrg, handleClickProfile, handleClickOrg }) => {
  console.log('1')
  console.log(viewOrg.manager)
  let employeeType = '';
  if (currentView === 'org-search-employee') {
    employeeType = searchResults.employeeType;
  }
  else if (currentView === 'org-chart') {
    employeeType = viewOrg.employeeType
  }
  const profileButton = `ui button employee-profile ${viewOrg.manager.id} ${viewOrg.manager.manager_id}`;
  const orgButton = `ui button employee-org ${viewOrg.manager.id} ${viewOrg.manager.manager_id}`;
  return (
    <div id={ employeeType } className='ui equal width grid container'>
      <div className='ui hidden divider'></div>
      <div className='row'>
        <div className='ten wide column'>
          <div className='ui row grid'>
            <div className='four wide column'>
              <img className='ui small image' alt='Profile Photo' src={ viewOrg.manager.photo }/>
            </div>
            <div className='twelve wide column'>
              <div className='row'>Name:
                <span> { viewOrg.manager.first_name }</span>
                <span> { viewOrg.manager.last_name }</span>
              </div>
              <div className='row'>ID:
                <span> { viewOrg.manager.id }</span>
              </div>
              <div className='row'>Job Title:
                <span> { viewOrg.manager.job_title }</span>
              </div>
              <div className='row'>Email:
                <span> {viewOrg.manager.email }</span>
              </div>
            </div>
          </div>
        </div>
        <div className='two wide column'>
          <div className='ui one column centered grid'>
            <div className='row'>
              <button className={ profileButton } type='submit' onClick={ handleClickProfile }>View Profile</button>
            </div>
            <div className='row'>
              <button className={ orgButton } type='submit' onClick={ handleClickOrg }>Org Chart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStatetoProps = ({ currentView, searchResults, viewOrg }) => ({ currentView, searchResults, viewOrg });

const mapDispatchtoProps = dispatch => {
  return {
    handleClickProfile: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3]
      }
      dispatch(renderProfile(employee.id))
    },
    handleClickOrg: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3],
        managerId: event.target.classList[4],
      }
      dispatch(renderOrgChart(employee))
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(OrgManager);
