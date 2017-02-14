const React = require('react');
const { connect } = require('react-redux')
const { renderProfile, renderOrgChart} = require('./actions')

const OrgReports = ({ viewOrg, handleClickProfile, handleClickOrg }) => {
  console.log('reports')
  console.log(viewOrg.reports)
  return (
    <div>
      { viewOrg.reports.map((report, i) => {
        let profileButton = `ui button employee-profile ${report.id} ${report.manager_id}`;
        let orgButton = `ui button report-org ${report.id} ${report.manager_id}`;
        return (
          <div key={ i } className='ui equal width grid container employee'>
            <div className='ui hidden divider'></div>
            <div className='row'>
              <div className='four wide column'></div>
              <div className='ten wide column'>
                <div className='ui row grid'>
                  <div className='four wide column'>
                    <img className='ui small image report-photo' alt='Profile Photo' src={ report.photo }/>
                  </div>
                  <div className='twelve wide column'>
                    <div className='row'>Name:
                      <span className='report-first'> { report.first_name }</span>
                      <span className='report-last'> { report.last_name }</span>
                    </div>
                    <div className='row'>ID:
                      <span className='report-id'> { report.id }</span>
                    </div>
                    <div className='row'>Job Title:
                      <span className='report-title'> { report.job_title }</span>
                    </div>
                    <div className='row'>Email:
                      <span className='report-email'> { report.email }</span>
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
        )})}
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

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(OrgReports);
