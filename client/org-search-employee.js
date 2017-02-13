const React = require('react');
const { connect } = require('react-redux');
const { renderProfile, renderOrgChart } = require('./actions');


const OrgSearchEmployee = ({ currentView, searchResults, viewOrg, handleClickProfile, handleClickOrg }) => {
  let result = [];
  if (currentView === 'org-search-employee') {
    result = searchResults.results;
  }
  else if (currentView === 'org-chart') {
    result = viewOrg.manager;
  }
  return (
    <div>
      { (currentView === 'org-search-employee')
          ? <div id='search-results'>Showing results for '{ searchResults.search }'</div>
          : null
      }
      { result.map((employee, i) => {
          let profileButton = `ui button ${viewOrg.employeeType}-profile ${employee.id} ${employee.manager_id}`;
          let orgButton = `ui button ${viewOrg.employeeType}-org ${employee.id} ${employee.manager_id}`;
          return (
            <div key={ i } className='ui equal width grid container'>
              <div className='ui hidden divider'></div>
              <div className='row'>
                <div className='ten wide column'>
                  <div className='ui row grid'>
                    <div className='four wide column'>
                      <img className='ui small image' alt='Profile Photo' src={ employee.photo }/>
                    </div>
                    <div className='twelve wide column'>
                      <div className='row'>Name:
                        <span> { employee.first_name }</span>
                        <span> { employee.last_name }</span>
                      </div>
                      <div className='row'>ID:
                        <span> { employee.id }</span>
                      </div>
                      <div className='row'>Job Title:
                        <span> { employee.job_title }</span>
                      </div>
                      <div className='row'>Email:
                        <span> {employee.email }</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='four wide column'>
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
          )})}
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


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(OrgSearchEmployee);
