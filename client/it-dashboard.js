const React = require('react');
const { connect } = require('react-redux');
const { changeLogo, saveLogo, newProfile, deleteProfile, deleteEmployeeNot } = require('./actions/employee-actions');


const ITDashboard = ({ currentUser, newEmployee, editEmployee, viewEmployee, deleteEmployee, newCollab, handleClickLogo, handleClickProfile, handleSubmit, handleClickYes, handleClickNo }) => {
  const yesButton = `ui button ${ deleteEmployee.employeeId }`;
  if (!currentUser.ITConfirmed) return null;

  return (
    <div>
      <div id='it-view' className='ui grid container'>
        { currentUser.changeLogo
          ? <div className="centered row">
              <div className="five wide column">
                <form id="update-logo" className="ui form six" onSubmit={ handleSubmit }>
                  <div className="fields inline">
                    <div className="sixteen wide field centered">
                      <input id="logo-url" type="text" name="logo" placeholder="Company Logo URL"/>
                      <button className="ui button" type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="five wide column">
                <button id='new-employee' className='ui button' type='submit' onClick={ handleClickProfile }>Create New Employee Profile</button>
              </div>
            </div>
          : <div className="centered row">
              <button id='change-logo' className='ui button' type='submit'onClick={ handleClickLogo }>Change Company Logo</button>
              <div className="ui vertical hidden divider"></div>
              <button id='new-employee' className='ui button' type='submit' onClick={ handleClickProfile }>Create New Employee Profile</button>
            </div>
        }
        { newEmployee.saved
          ? <div className="centered row">
              <div>Employee '{viewEmployee.employee.id} {viewEmployee.employee.first_name} {viewEmployee.employee.last_name}' successfully created!</div>
            </div>
          : null
        }
        { editEmployee.saved
          ? <div className="centered row">
              <div>Employee '{viewEmployee.employee.id} {viewEmployee.employee.first_name} {viewEmployee.employee.last_name}' successfully updated!</div>
            </div>
          : null
        }
        { newCollab.saved
          ? <div className="centered row">
              <div>New { newCollab.type } collaboration successfully created!</div>
            </div>
          : null
        }

        { deleteEmployee.deleteSubmitted
          ? <div className="centered row">
              <div className="ui centered grid">
                <div className="centered row">
                  <div>Are you sure you would like to delete Employee '{ deleteEmployee.employeeId }'?</div>
                </div>
                <div className="centered row">
                  <button className={ yesButton } type='submit' onClick={ handleClickYes }>Yes</button>
                  <button className='ui button' type='submit' onClick={ handleClickNo }>No</button>
                </div>
              </div>
            </div>
          : null
        }
        { deleteEmployee.deleted
          ? <div className="centered row">
              <div>Employee '{ deleteEmployee.employeeId }' has been deleted.</div>
            </div>
          : null
        }
        { deleteEmployee.error
          ? <div className="centered row">
              <div>Employee '{ deleteEmployee.employeeId }' still exists.</div>
            </div>
          : null
        }
      </div>
    </div>
  )
}

const mapStatetoProps = ({ currentUser, newEmployee, editEmployee, viewEmployee, deleteEmployee, newCollab }) => ({ currentUser, newEmployee, editEmployee, viewEmployee, deleteEmployee, newCollab })

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
    },
    handleClickYes: event => {
      event.preventDefault();
      const id = event.target.classList[2].toUpperCase();
      dispatch(deleteProfile(id));
    },
    handleClickNo: event => {
      event.preventDefault();
      dispatch(deleteEmployeeNot());
    }
  }
}


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(ITDashboard)
