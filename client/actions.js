const employeeSubmitted = () => {
  return { type: 'EMPLOYEE_SUBMITTED' }
}

const employeeSaved = () => {
  return { type: 'EMPLOYEE_SAVED' }
}

const employeeFailure = () => {
  return { type: 'EMPLOYEE_FAILURE' }
}

const formCleared = () => {
  return { type: 'FORM_CLEARED' }
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

const idSearch = () => {
  return { type: 'ID_SEARCH' }
}

const idFound = (response) => {
  return { type: 'ID_FOUND', response }
}

const idNotFound = () => {
  return { type: 'ID_NOT_FOUND' }
}

const idCleared = () => {
  return { type: 'ID_CLEARED' }
}

const renderProfile = employeeId => {
  return dispatch => {
    dispatch(idSearch());

    fetch(`/viewemployee/${employeeId}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          alert(response.error);
          dispatch(idNotFound());
        }
        else if (response.id) {
          dispatch(idFound(response))
        }
      })
      .then( () => {
        document.getElementById('find').reset();
        dispatch(idCleared());
      })

  }
}


module.exports = { saveEmployee, renderProfile }
