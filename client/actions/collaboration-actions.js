const newCollab = (employee) => {
  return dispatch => {
    dispatch({ type: 'CREATE_COLLAB_SUBMITTED', employeeId: employee.id });
  }
}


const collabSubmitted = () => {
  return { type: 'COLLAB_SUBMITTED' }
}

const missingFieldsNewCollab = (missing) => {
  return { type: 'MISSING_FIELDS_NEW_COLLAB', missing }
}

const collabSaved = (response) => {
  return { type: 'COLLAB_SAVED', response }
}

const collabFailure = (errorDescription) => {
  return { type: 'COLLAB_FAILURE', errorDescription }
}

const saveCollab = collaboration => {
  return dispatch => {
    dispatch(collabSubmitted());
    const missing = [];
    let isMissing = false;
    for (let key in collaboration) {
      if (collaboration[key] === '') {
        missing.push(key);
        isMissing = true;
      }
    }
    if (isMissing) {
      dispatch(missingFieldsNewCollab(missing));
      return;
    }
    else {
      fetch('/collaboration', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(collaboration)
      })
        .then( response => response.json())
        .then( response => {
          console.log(response)
          if (response.error) {
            dispatch(collabFailure(collaboration.Managed_By));
          }
          else if (response.id) {
            dispatch(employeeSaved(response));
          }
        })
    }
  }
}
/*
const idSearch = (employeeId) => {
  return { type: 'ID_SEARCH', employeeId }
}

const idFound = (response) => {
  return { type: 'ID_FOUND', response }
}

const idNotFound = () => {
  return { type: 'ID_NOT_FOUND' }
}

const renderProfile = employeeId => {
  return dispatch => {
    dispatch(idSearch(employeeId));
    employeeId = employeeId.toUpperCase();
    fetch(`/employee/${employeeId}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        if (response.error) {
          alert(response.error);
          dispatch(idNotFound());
        }
        else if (response.id) {
          dispatch(idFound(response))
        }
      })
  }
}


const editRequested = () => {
  return { type: 'EDIT_REQUESTED' }
}

const editForm = (response) => {
  return { type: 'EDIT_FORM', response }
}

const updateProfile = employeeId => {
  return dispatch => {
    dispatch(editRequested());

    fetch(`/employee/${employeeId}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        dispatch(editForm(response));
      })
  }
}


const editSubmitted = () => {
  return { type: 'EDIT_SUBMITTED' }
}

const missingFieldsEdit = (missing, photoError) => {
  return { type: 'MISSING_FIELDS_EDIT', missing, photoError }
}

const editFailure = (errorDescription) => {
  return { type: 'EDIT_FAILURE', errorDescription }
}

const editSaved = response => {
  return { type: 'EDIT_SAVED', response }
}

const saveUpdate = employee => {
  return dispatch => {
    dispatch(editSubmitted());
    const missing = [];
    let check = false;
    let photoError = false;
    for (let key in employee) {
      if (key != 'Photo' && key != 'Job_Description') {
        if (employee[key] === '') {
          missing.push(key);
          check = true;
        }
      }
    }
    fetch(employee.Photo)
      .then(photo => {
        if (!photo.ok) {
          photoError = true;
        }
        if (check || photoError) {
          dispatch(missingFieldsEdit(missing, photoError));
          return;
        }
        return Promise.resolve(photoError)
      })
      .then( () => {
        if (!check && !photoError) {
          fetch('/employee', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(employee)
          })
            .then( response => response.json())
            .then( response => {
              if (response.error === 'manager') {
                dispatch(editFailure(employee.Manager_ID));
              }
              else if (response.id) {
                dispatch(editSaved(response))
              }
            })
        }
      })

  }
}


const deleteEmployeeSubmitted = (employeeId) => {
  return dispatch => dispatch({ type: 'DELETE_EMPLOYEE_SUBMITTED', employeeId })
}

const deleteEmployeeNot = () => {
  return dispatch => dispatch({ type: 'DELETE_EMPLOYEE_NOT' })
}

const deleteEmployeeConfirmed = () => {
  return { type: 'DELETE_EMPLOYEE_CONFIRMED' }
}

const deleteEmployeeError = () => {
  return { type: 'DELETE_EMPLOYEE_ERROR' }
}

const employeeDeleted = () => {
  return { type: 'EMPLOYEE_DELETED' }
}

const deleteProfile = employeeId => {
  return dispatch => {
    dispatch(deleteEmployeeConfirmed());
    fetch(`/employee/${employeeId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        if (response.error) {
          dispatch(deleteEmployeeError());
        }
        else if (response.success) {
          dispatch(employeeDeleted(response))
        }
      })
  }
}*/


module.exports = { newCollab, collabSubmitted, missingFieldsNewCollab, collabSaved, collabFailure, saveCollab }
