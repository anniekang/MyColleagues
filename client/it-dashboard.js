const React = require('react');
const { connect } = require('react-redux');
const { changeLogo, saveLogo, newProfile } = require('./actions');

const ITDashboard = ({ currentUser, handleClickLogo, handleClickProfile, handleSubmit }) => {
  console.log(currentUser.IT)
  return (
    <div>
      { currentUser.IT
        ? <div id='it-view' className='ui grid container'>
            <div className="centered row">
              { currentUser.changeLogo
                ? <div className="five wide column">
                    <form id="update-logo" className="ui form six" onSubmit={ handleSubmit }>
                      <div className="fields inline">
                        <div className="sixteen wide field centered">
                          <input id="logo-url" type="text" name="logo" placeholder="Company Logo URL"/>
                          <button className="ui button" type="submit">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                : <button id='change-logo' className='ui button' type='submit'onClick={ handleClickLogo }>Change Company Logo</button>
              }
              <div className="ui hidden vertical divider"></div>
              <div className="five wide column">
                <button id='new-employee' className='ui button' type='submit' onClick={ handleClickProfile }>Create New Employee Profile</button>
              </div>
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
      event.preventDefault();
      dispatch(changeLogo());
    },
    handleClickProfile: event => {
      event.preventDefault();
      dispatch(newProfile());
    },
    handleSubmit: event => {
      event.preventDefault();
      const logoURL = new FormData(event.target);
      const logo = logoURL.get('logo');
      dispatch(saveLogo(logo));
    }
  }
}

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(ITDashboard)
