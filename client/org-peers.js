const React = require('react');
const { connect } = require('react-redux');
const { renderProfile, renderOrgChart } = require('./actions')

const OrgPeers = ({ viewOrg, handleClickProfile, handleClickOrg }) => {
  console.log('peers')
  console.log(viewOrg.peers)
  return (
    <div>
      { console.log(viewOrg.peers) }
      {  viewOrg.peers.map((peer, i) => {
          console.log(peer)
          console.log(peer.photo)
          let profileButton = `ui button employee-profile ${peer.id} ${peer.manager_id}`;
          let orgButton = `ui button employee-org ${peer.id} ${peer.manager_id}`;
          return (
            <div id={ peer.id } key={ i } className='ui equal width grid container employee'>
              <div className='ui hidden divider'></div>
              <div className='row'>
                <div className='two wide column'></div>
                <div className='ten wide column'>
                  <div className='ui row grid'>
                    <div className='four wide column'>
                      <img className='ui small image employee-photo' alt='Profile Photo' src={ peer.photo }/>
                    </div>
                    <div className='twelve wide column'>
                      <div className='row'>Name:
                        <span className='employee-first'> { peer.first_name}</span>
                        <span className='employee-last'> { peer.last_name }</span>
                      </div>
                      <div className='row'>ID:
                        <span className='employee-id'> { peer.id }</span>
                      </div>
                      <div className='row'>Job Title:
                        <span className='employee-title'> { peer.job_title }</span>
                      </div>
                      <div className='row'>Email:
                        <span className='employee-email'> { peer.email }</span>
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

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(OrgPeers);
