const React = require('react');
const { connect } = require('react-redux');
const { renderProfile, renderOrgChart } = require('./actions');


const OrgEmployee = ({ viewOrg, handleClickProfile, handleClickOrg }) => {
  console.log(viewOrg)
  const profileButton = `ui button ${viewOrg.employeeType}-profile ${viewOrg.manager.id} ${viewOrg.manager.manager_id}`;
  const orgButton = `ui button ${viewOrg.employeeType}-org ${viewOrg.manager.id} ${viewOrg.manager.manager_id}`;
  return (
    <div id={ viewOrg.employeeType } className='ui equal width grid container'>
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
  )
}

const mapStatetoProps = ({ viewOrg }) => ({ viewOrg });

const mapDispatchtoProps = dispatch => {
  return {
    handleClickProfile: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3]
      }
      console.log(employee)
      dispatch(renderProfile(employee.id))
    },
    handleClickOrg: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3],
        managerId: event.target.classList[4],
      }
      console.log(employee)
      dispatch(renderOrgChart(employee))
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(OrgEmployee);
