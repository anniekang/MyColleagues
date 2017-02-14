const React = require('react');
const { connect } = require('react-redux');
const { updateProfile, deleteProfile, renderOrgChart } = require('./actions');


const ViewEmployee = ({ currentUser, viewEmployee, handleClickEdit, handleClickOrg, handleClickDelete }) => {
  const editButton = `ui button edit-profile ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;
  const orgButton = `ui button employee-org ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;
  const delButton = `ui button del-profile ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;

  return (
    <div id='view-profile' className='ui grid container'>
      <div className='ui fourteen wide centered column row'>
        <div className='thirteen wide column'>

          <div className='row'>
            <span id='profile-first'>{ viewEmployee.employee.first_name }</span>
            <span id='profile-last'> { viewEmployee.employee.last_name }</span>
          </div>
          <div className='ui hidden divider'></div>
          <div className='ui row grid'>
            <div className='four wide column'>
              <img id='profile-photo' className='ui small centered image' alt='Profile Photo' src={ viewEmployee.employee.photo }/>
            </div>
            <div id='profile-info' className='twelve wide column'>
              <div className='row'>ID:
                <span id='profile-id'> { viewEmployee.employee.id }</span>
              </div>
              <div className='row'>Job Title:
                <span id='profile-title'> { viewEmployee.employee.job_title }</span>
              </div>
              <div className='row'>
                <div id='profile-description-label'>Job Description:</div>
                <div id='profile-description'> { viewEmployee.employee.job_description }</div>
              </div>
              <div className='row'>Email:
                <span id='profile-email'> { viewEmployee.employee.email }</span>
              </div>
              <div className='row'>Manager ID:
                <span id='profile-manager'> { viewEmployee.employee.manager_id }</span>
              </div>
              <div className='row'>Manager Name:
                <span id='profile-manager-name'> { viewEmployee.employee.manager_first_name } { viewEmployee.employee.manager_last_name }</span>
              </div>
            </div>
          </div>
        </div>
        <div className='three wide column'>
          <div className='ui one column centered grid'>
            <div className='ui hidden divider'></div>

            <div className='row'>
              <button id='edit-button' className={ editButton } type='submit' onClick={ handleClickEdit }>Edit Profile</button>
            </div>
            <div className='row'>
              <button id='org-button' className={ orgButton } type='submit' onClick={ handleClickOrg }>Org Chart</button>
            </div>
            { currentUser.IT
                ? <div className='row'>
                    <button id='delete-button' className={ delButton } type='submit' onClick={ handleClickDelete }>Delete Profile</button>
                  </div>
                : null
            }

          </div>
        </div>
      </div>
    </div>
  )
};

const mapStatetoProps = ({ currentUser, viewEmployee }) => ({ currentUser, viewEmployee });

const mapDispatchtoProps = dispatch => {
  return {
    handleClickEdit: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3].trim().toUpperCase()
      };
      console.log(employee)
      dispatch(updateProfile(employee.id))
    },
    handleClickOrg: event => {
      event.preventDefault();
      const employee = {
        id: document.getElementById('profile-id').textContent.trim(),
        managerId: document.getElementById('profile-manager').textContent.trim()
      }
      dispatch(renderOrgChart(employee))
    },
    handleClickDelete: event => {
      event.preventDefault();
      const employee = {
        id: document.getElementById('profile-id').textContent.trim(),
        first: document.getElementById('profile-first').textContent.trim(),
        last: document.getElementById('profile-last').textContent.trim()
      };
      dispatch(deleteProfile(employee))
    }
  }
};

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(ViewEmployee);
