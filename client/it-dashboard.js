const React = require('react');
const { connect } = require('react-redux');
const { newProfile } = require('./actions');

const ITDashboard = ({ currentUser, handleClickLogo, handleClickProfile }) => {
  console.log(currentUser.IT)
  return (
    <div>
      { currentUser.IT
        ? <div id='it-view' className='ui grid container'>
            <div className="centered row">
              <button id='change-logo' className='ui button' type='submit'onClick={ handleClickLogo }>Change Company Logo</button>
              <button id='new-employee' className='ui button' type='submit' onClick={ handleClickProfile }>Create New Employee Profile</button>
            </div>
          </div>
        : null
      }
    </div>
  )
}

const mapStatetoProps = ({ currentUser }) => ({ currentUser })

const mapDispatchtoProps = dispatch => {
  return {
    handleClickLogo: event => {
      event.preventDefault()
    },
    handleClickProfile: event => {
    event.preventDefault()
    dispatch(newProfile());
    }
  }
}

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(ITDashboard)
