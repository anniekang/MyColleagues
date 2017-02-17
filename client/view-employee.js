const React = require('react');
const { connect } = require('react-redux');
const { updateProfile, deleteEmployeeSubmitted, renderOrgChart } = require('./actions');


const ViewEmployee = ({ currentUser, viewEmployee, handleClickEdit, handleClickOrg, handleClickDelete, handleClickNew }) => {
  const defaultPhoto = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';

  const first = viewEmployee.employee.first_name.substr(0,1) + viewEmployee.employee.first_name.substr(1).toLowerCase();
  const last = viewEmployee.employee.last_name.substr(0,1) + viewEmployee.employee.last_name.substr(1).toLowerCase();
  const email = `mailto:${viewEmployee.employee.email }`;
  const editButton = `ui button edit-profile ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;
  const orgButton = `ui button employee-org ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;
  const delButton = `ui button del-profile ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;
  const collabButton = `ui button new-collab ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;

  return (
    <div className='ui grid container'>
      <div className="row">
        <div id='view-profile' className='ui grid container'>
          <div className='ui fourteen wide centered column row'>
            <div className='thirteen wide column'>
              <div className='row'>
                <span id='profile-first'>{ first }</span>
                <span id='profile-last'> { last }</span>
              </div>
              <div className='ui hidden divider'></div>
              <div className='ui row grid'>
                <div className='four wide column'>
                  <img id='profile-photo' className='ui small centered image' alt='Profile Photo' src={ viewEmployee.employee.photo || defaultPhoto }/>
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
                    <a id='profile-email' href={ email }> { viewEmployee.employee.email } </a>
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
                { (currentUser.employeeFound && viewEmployee.employee.id === currentUser.employeeId) || currentUser.ITConfirmed
                  ? <div className='row'>
                      <button id='edit-button' className={ editButton } type='submit' onClick={ handleClickEdit }>Edit Profile</button>
                    </div>
                  : null
                }
                <div className='row'>
                  <button id='org-button' className={ orgButton } type='submit' onClick={ handleClickOrg }>Org Chart</button>
                </div>
                  { currentUser.ITConfirmed
                      ? <div className='row'>
                          <button id='delete-button' className={ delButton } type='submit' onClick={ handleClickDelete }>Delete Profile</button>
                        </div>
                      : null
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">

        <div id='view-profile-collabs' className='ui grid container'>
          <div className='ui fourteen wide centered column row'>
            <div className='thirteen wide column'>
              <div className='row'>
                Collaborations
              </div>
              <div className='ui hidden divider'></div>
              <div className='ui row grid'>
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
                    <a id='profile-email' href={ email }> { viewEmployee.employee.email } </a>
                  </div>
                  <div className='row'>Manager ID:
                    <span id='profile-manager'> { viewEmployee.employee.manager_id }</span>
                  </div>
                  <div className='row'>Manager Name:
                    <span id='profile-manager-name'> { viewEmployee.employee.manager_first_name } { viewEmployee.employee.manager_last_name }</span>
                  </div>
                  </div>
              </div>
              <div className='three wide column'>
                <div className='ui one column centered grid'>
                  <div className='ui hidden divider'></div>
                  { (currentUser.employeeFound && viewEmployee.employee.id === currentUser.employeeId) || currentUser.ITConfirmed
                    ? <div className='row'>
                        <button id='new-collab-button' className={ collabButton } type='submit' onClick={ handleClickNew }>New Collaboration</button>
                      </div>
                    : null
                  }
                </div>
              </div>
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
        id: event.target.classList[3].toUpperCase()
      };
      dispatch(updateProfile(employee.id))
    },
    handleClickOrg: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3].toUpperCase(),
        managerId: event.target.classList[4].toUpperCase()
      }
      dispatch(renderOrgChart(employee))
    },
    handleClickDelete: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3].toUpperCase()
      };
      dispatch(deleteEmployeeSubmitted(employee.id))
    },
    handleClickNew: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3].toUpperCase()
      };
      console.log(employee);
      //dispatch(deleteEmployeeSubmitted(employee.id))
    }
  }
};

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(ViewEmployee);
