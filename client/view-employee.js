const React = require('react');
const { connect } = require('react-redux');
const { updateProfile, deleteProfile, renderOrgChart } = require('./actions');


const ViewEmployee = ({ viewEmployee, handleClickEdit, handleClickOrg, handleClickDelete }) => {
  const defaultPhoto = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';

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
              <button id='edit-button' className='ui button' type='submit' onClick={ handleClickEdit }>Edit Profile</button>
            </div>
            <div className='row'>
              <button id='org-button' className='ui button' type='submit' onClick={ handleClickOrg }>Org Chart</button>
            </div>
            <div className='row'>
              <button id='delete-button' className='ui button' type='submit' onClick={ handleClickDelete }>Delete Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStatetoProps = ({ viewEmployee }) => ({ viewEmployee });

const mapDispatchtoProps = dispatch => {
  return {
    handleClickEdit: event => {
      event.preventDefault();
      const employee = {
        id: document.getElementById('profile-id').textContent.trim()
      };
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
