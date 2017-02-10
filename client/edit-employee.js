const React = require('react');
const { connect } = require('react-redux');
const { saveEmployee, saveUpdate } = require('./actions');

const EditEmployee = ( { handleSubmit, handleSubmitEdit, currentView, editEmployee } ) => {
  console.log(currentView);
  let handle = '';
  if (editEmployee.editReady) {
    handle = handleSubmitEdit
  }
  else {
    handle = handleSubmit
  }

  return (
    <div id="edit-profile" className="ui grid container">
      <div className="ui hidden divider"></div>
      <form id="employee" className="ui sixteen wide column fluid form" onSubmit={ handle }>
        <div className="field">
          <label>Employee Profile</label>
        </div>
        <div className="field">
          <label>ID</label>
          <input id="employee-id" type="text" name="id" placeholder="ID"/>
        </div>
        <div className="field">
          <label>First Name</label>
          <input id="employee-first" type="text" name="first-name" placeholder="First Name"/>
        </div>
        <div className="field">
          <label>Last Name</label>
          <input id="employee-last" type="text" name="last-name" placeholder="Last Name"/>
        </div>
        <div className="field">
          <label>Photo</label>
          <input id="employee-photo" type="text" name="photo" placeholder="Photo URL"/>
        </div>
        <div className="field">
          <label>Job Title</label>
          <input id="employee-title" type="text" name="job-title" placeholder="Job Title"/>
        </div>
        <div id="description" className="field">
          <label>Job Description</label>
          <textarea id="employee-description" rows="2" name="job-description" placeholder="Job Description"></textarea>
        </div>
        <div className="field">
          <label>Email</label>
          <input id="employee-email" type="text" name="email" placeholder="Email Address"/>
        </div>
        <div className="field">
          <label>Manager ID</label>
          <input id="employee-manager" type="text" name="manager-id" placeholder="Manager ID"/>
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui one column centered grid">
          <button className="ui button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

const mapStatetoProps = ({ editEmployee, currentView }) => ({ editEmployee, currentView })

const mapDispatchtoProps = ( dispatch ) => {
  return {
    handleSubmit: event => {
      event.preventDefault();

      const employeeData = new FormData(event.target);
      const employee = {
        id: employeeData.get('id'),
        first: employeeData.get('first-name'),
        last: employeeData.get('last-name'),
        photo: employeeData.get('photo'),
        title: employeeData.get('job-title'),
        description: employeeData.get('job-description'),
        email: employeeData.get('email'),
        managerId: employeeData.get('manager-id'),
      };
      for (let key in employee) {
        employee[key] = employee[key].toUpperCase();
      }

      dispatch(saveEmployee(employee));
    },
    handleSubmitEdit: event => {
      event.preventDefault();

      const employeeData = new FormData(event.target);
      const employee = {
        id: employeeData.get('id'),
        first: employeeData.get('first-name'),
        last: employeeData.get('last-name'),
        photo: employeeData.get('photo'),
        title: employeeData.get('job-title'),
        description: employeeData.get('job-description'),
        email: employeeData.get('email'),
        managerId: employeeData.get('manager-id'),
      };
      /*for (let key in employee) {
        employee[key] = employee[key].toUpperCase();
      }*/
      dispatch(saveUpdate(employee));
    }
  }
};

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(EditEmployee);
