const employeeSubmitted = () => {
  return { type: 'EMPLOYEE_SUBMITTED'}
}

const employeeSaved = () => {
  return { type: 'EMPLOYEE_SAVED'}
}

const employeeFailure = () => {
  return { type: 'EMPLOYEE_FAILURE'}
}

const formCleared = () => {
  return { type: 'FORM_CLEARED'}
}

const saveEmployee = employee => {
  return dispatch => {
    dispatch(employeeSubmitted());

    fetch('/newemployee/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(employee)
    })
      .then(response => response.json())
      .then(({ error, id, first_name, last_name }) => {
        if (error) {
          alert(error);
          dispatch(employeeFailure());
        }
        else {
          alert(`Employee ${id} ${first_name} ${last_name} succcessfully created!`)
          dispatch(employeeSaved());
        }

      })
      .then( () => {
        document.getElementById('employee').reset();
        dispatch(formCleared());
      })
  }
}

module.exports = { saveEmployee }
