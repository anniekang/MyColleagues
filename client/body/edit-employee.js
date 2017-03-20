const React = require('react');
const { connect } = require('react-redux');
const { saveEmployee, saveUpdate } = require('../actions/employee-actions');


const Missing = ({ missingFields, photoError }) => {
  if (!missingFields && !photoError) return null;
  return (
    <ul className="error">
      { missingFields.map((key, i) => {
        return <li key={ i }>'{ key }' field required.</li>
      })}
      { photoError
        ? <li >Photo not found.</li>
        : null
      }
    </ul>
  )
}

const NewError = ({ errorCode, errorDescription }) => {
  if (!errorCode) return null;
  return (
    <ul className="error">
      { errorCode === 'id'
          ? <li>Employee '{ errorDescription }' already exists.</li>
          : <li>Manager '{ errorDescription }' does not exist.</li>
      }
    </ul>
  )
}

const EditError = ({ errorDescription }) => {
  if (!errorDescription) return null;
  return (
    <ul className="error">
      <li>Manager '{ errorDescription }' does not exist.</li>
    </ul>
  )
}

const EditEmployee = ( { currentUser, newEmployee, editEmployee, handleSubmit } ) => {
  let isNew = '';
  let employee = {};
  if (newEmployee.newProfile){
    isNew = true;
    employee = newEmployee;
  }
  else if (editEmployee.editReady) {
    isNew = false;
    employee = editEmployee;
  }

  return (
    <div id="edit-profile" className="ui grid container">
      < Missing missingFields={ employee.missingFields } photoError={ employee.photoError }/>
      < NewError errorCode={ newEmployee.errorCode } errorDescription={ newEmployee.errorDescription }/>
      < EditError errorDescription={ editEmployee.errorDescription }/>

      <form id="employee" className="ui ten wide centered column fluid form" onSubmit={ handleSubmit(isNew) }>
        <div className="field">
          <label>Employee Profile</label>
        </div>
        <div className="required field">
          <label>ID</label>
          { editEmployee.editReady
            ? <input id="employee-id" type="text" name="id" value={ editEmployee.employee.id } placeholder="ID" readOnly/>
            : <input id="employee-id" type="text" name="id" placeholder="ID"/>
          }
        </div>
        <div className="required field">
          <label>First Name</label>
          <input id="employee-first" type="text" name="first-name" defaultValue={ editEmployee.employee.first_name } placeholder="First Name"/>
        </div>
        <div className="required field">
          <label>Last Name</label>
          <input id="employee-last" type="text" name="last-name" defaultValue={ editEmployee.employee.last_name } placeholder="Last Name"/>
        </div>
        <div className="field">
          <label>Photo</label>
          <input id="employee-photo" type="text" name="photo" defaultValue={ editEmployee.employee.photo } placeholder="Photo URL"/>
        </div>
        <div className="required field">
          <label>Job Title</label>
          <input id="employee-title" type="text" name="job-title" defaultValue={ editEmployee.employee.job_title } placeholder="Job Title"/>
        </div>
        <div id="description" className="field">
          <label>Job Description</label>
          <textarea id="employee-description" rows="2" name="job-description" defaultValue={ editEmployee.employee.job_description } placeholder="Job Description"></textarea>
        </div>
        <div className="required field">
          <label>Email</label>
          <input id="employee-email" type="text" name="email" defaultValue={ editEmployee.employee.email } placeholder="Email Address"/>
        </div>
        <div className="required field">
          <label>Manager ID</label>
          { currentUser.employeeFound
            ? <input id="employee-manager" type="text" name="manager-id" value={ editEmployee.employee.manager_id } placeholder="Manager ID" readOnly/>
            : <input id="employee-manager" type="text" name="manager-id" defaultValue={ editEmployee.employee.manager_id } placeholder="Manager ID"/>
          }
        </div>
        <div className="field">
          <label>LinkedIn URL</label>
          <input id="linkedin" type="text" name="linkedin" defaultValue={ editEmployee.employee.linkedin } placeholder="LinkedIn URL"/>
        </div>
        <div className="field">
          <label>Twitter Username</label>
          <input id="twitter" type="text" name="twitter" defaultValue={ editEmployee.employee.twitter } placeholder="Twitter Username"/>
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui one column centered grid">
          { newEmployee.newProfile
            ? <button className="ui button" type="submit">Create</button>
            : <button className="ui button" type="submit">Submit</button>
          }
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui hidden divider"></div>
      </form>
    </div>
  )
}

const mapStatetoProps = ({ currentUser, newEmployee, editEmployee }) => ({ currentUser, newEmployee, editEmployee })

const mapDispatchtoProps = dispatch => {
  return {
    handleSubmit: isNew => event => {
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const employee = {
        ID: employeeData.get('id').trim().toUpperCase(),
        First_Name: employeeData.get('first-name').trim().toUpperCase(),
        Last_Name: employeeData.get('last-name').trim().toUpperCase(),
        Photo: employeeData.get('photo').trim(),
        Job_Title: employeeData.get('job-title').trim().toUpperCase(),
        Job_Description: employeeData.get('job-description').trim(),
        Email: employeeData.get('email').trim().toUpperCase(),
        Manager_ID: employeeData.get('manager-id').trim().toUpperCase(),
        LinkedIn: employeeData.get('linkedin').trim(),
        Twitter: employeeData.get('twitter').trim()
      };
      const action = isNew ? saveEmployee : saveUpdate;
      dispatch(action(employee));
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(EditEmployee);
