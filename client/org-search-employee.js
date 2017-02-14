const React = require('react');
const { connect } = require('react-redux');
const { renderProfile, renderOrgChart } = require('./actions')

const OrgSearchEmployee = ({ currentView, searchResults, viewOrg, handleClickProfile, handleClickOrg }) => {
  let result = [];
  let employeeType = '';
  if (currentView === 'org-search-employee') {
    result = searchResults.results;
    employeeType = searchResults.employeeType;
  }
  else if (currentView === 'org-chart') {
    result = viewOrg.employee;
    employeeType = viewOrg.employeeType
  }
  console.log(result)
  return (
    <div className='ui grid container'>
      { (currentView === 'org-search-employee')
          ? <div id='search-results'>Showing results for '{ searchResults.search }'</div>
          : null
      }
      { result.map((employee, i) => {
          let profileButton = `ui button ${ employeeType }-profile ${employee.id} ${employee.manager_id}`;
          let orgButton = `ui button ${ employeeType }-org ${employee.id} ${employee.manager_id}`;
          return (
          <div key={ i } id={ employee.id } className='ui equal width grid container employee'>
            <div className='ui hidden divider'></div>
            <div className='row'>
              <div className='two wide column'></div>
              <div className='ten wide column'>
                <div className='ui row grid'>
                  <div className='four wide column'>
                    <img className='ui small image employee-photo' alt='Profile Photo' src={ employee.photo }/>
                  </div>
                  <div className='twelve wide column'>
                    <div className='row'>Name:
                      <span className='employee-first'> { employee.first_name}</span>
                      <span className='employee-last'> { employee.last_name }</span>
                    </div>
                    <div className='row'>ID:
                      <span className='employee-id'> { employee.id }</span>
                    </div>
                    <div className='row'>Job Title:
                      <span className='employee-title'> { employee.job_title }</span>
                    </div>
                    <div className='row'>Email:
                      <span className='employee-email'> { employee.email }</span>
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
                    <button className={ orgButton }  type='submit' onClick={ handleClickOrg }>Org Chart</button>
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
