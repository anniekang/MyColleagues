const React = require('react');
const { connect } = require('react-redux');
const { renderProfile, renderOrgChart } = require('./actions')

const OrgMain = ({ viewOrg, handleClickProfile, handleClickOrg }) => {
  const profileButton = `ui button employee-profile ${viewOrg.employee.id} ${viewOrg.employee.manager_id}`;
  const orgButton = `ui button employee-org ${viewOrg.employee.id} ${viewOrg.employee.manager_id}`;
  return (
    <div id={ viewOrg.employee.id } className='ui equal width grid container employee'>
      <div className='ui hidden divider'></div>
      <div className='row'>
        <div className='one wide column'></div>
        <div className='ten wide column'>
          <div className='ui row grid'>
            <div className='four wide column'>
              <img className='ui small image employee-photo' alt='Profile Photo' src={ viewOrg.employee.photo }/>
            </div>
            <div className='twelve wide column'>
              <div className='row'>Name:
                <span className='employee-first'> { viewOrg.employee.first_name}</span>
                <span className='employee-last'> { viewOrg.employee.last_name }</span>
              </div>
              <div className='row'>ID:
                <span className='employee-id'> { viewOrg.employee.id }</span>
              </div>
              <div className='row'>Job Title:
                <span className='employee-title'> { viewOrg.employee.job_title }</span>
              </div>
              <div className='row'>Email:
                <span className='employee-email'> { viewOrg.employee.email }</span>
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
              <button className={ orgButton }  type='submit' onClick={ handleClickOrg }>Org Chart</button>
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


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(OrgMain);
