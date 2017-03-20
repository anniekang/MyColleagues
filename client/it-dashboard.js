const React = require('react');
const { connect } = require('react-redux');
const { changeLogo, saveLogo, newProfile, deleteProfile, deleteEmployeeNot } = require('./actions/employee-actions');
const { deleteCollaboration, deleteCollaborationNot } = require('./actions/collaboration-actions');



const ITDashboard = ({ currentUser, newEmployee, editEmployee, viewEmployee, deleteEmployee, newCollaboration, editCollaboration, deleteCollaboration, handleClick, handleSubmit }) => {
  const yesButtonEmployee = `ui button ${ deleteEmployee.employeeId }`;
  const yesButtonCollaboration = `ui button ${ deleteCollaboration.collaborationId }`;
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
                <button id='new-employee' className='ui button' type='submit' onClick={ handleClick('profile') }>Create New Employee Profile</button>
              </div>
            </div>
          : <div className="centered row">
              <button id='change-logo' className='ui button' type='submit'onClick={ handleClick('logo') }>Change Company Logo</button>
              <div className="ui vertical hidden divider"></div>
              <button id='new-employee' className='ui button' type='submit' onClick={ handleClick('profile') }>Create New Employee Profile</button>
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
        { newCollaboration.saved
          ? <div className="centered row">
              <div>{ newCollaboration.collaboration.type } { newCollaboration.collaboration.collaboration_id } successfully created!</div>
            </div>
          : null
        }
        { editCollaboration.saved
          ? <div className="centered row">
              <div>{ editCollaboration.collaboration.type } { editCollaboration.collaboration.collaboration_id } successfully updated!</div>
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
                  <button className={ yesButtonEmployee } type='submit' onClick={ handleClick('yesEmployee') }>Yes</button>
                  <button className='ui button' type='submit' onClick={ handleClick('noEmployee') }>No</button>
                </div>
              </div>
            </div>
          : null
        }
        { deleteCollaboration.deleteSubmitted
          ? <div className="centered row">
              <div className="ui centered grid">
                <div className="centered row">
                  <div>Are you sure you would like to delete Collaboration '{ deleteCollaboration.collaborationId }'?</div>
                </div>
                <div className="centered row">
                  <button className={ yesButtonCollaboration } type='submit' onClick={ handleClick('yesCollaboration') }>Yes</button>
                  <button className='ui button' type='submit' onClick={ handleClick('noCollaboration') }>No</button>
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
        { deleteCollaboration.deleted
          ? <div className="centered row">
              <div>Collaboration '{ deleteCollaboration.collaborationId }' has been deleted.</div>
            </div>
          : null
        }
        { deleteCollaboration.error
          ? <div className="centered row">
              <div>Collaboration '{ deleteCollaboration.collaborationId }' still exists.</div>
            </div>
          : null
        }
      </div>
    </div>
  )
}

const mapStatetoProps = ({ currentUser, newEmployee, editEmployee, viewEmployee, deleteEmployee, newCollaboration, editCollaboration, deleteCollaboration }) => ({ currentUser, newEmployee, editEmployee, viewEmployee, deleteEmployee, newCollaboration, editCollaboration, deleteCollaboration })

const mapDispatchtoProps = dispatch => {
  return {
    handleClick: type => event => {
      event.preventDefault();
      if (type === 'logo') dispatch(changeLogo())
      else if (type === 'profile') dispatch(newProfile())
      else if (type === 'yesEmployee') dispatch(deleteProfile(event.target.classList[2].toUpperCase()))
      else if (type === 'noEmployee') dispatch(deleteEmployeeNot())
      else if (type === 'yesCollaboration') dispatch(deleteCollaboration(event.target.classList[2].toUpperCase()))
      else if (type === 'noCollaboration') dispatch(deleteCollaborationNot())
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
