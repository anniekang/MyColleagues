const loadCSV = () => {
  return dispatch => {
    fetch('/loadcsv', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({})
    })
      .then( response => {
        if (response.success) dispatch({ type: 'LOAD_CSV' })
      })
  }
}

const ITChecked = () => {
  return dispatch => dispatch({ type: 'IT_CHECKED' })
}

const employeeChecked = () => {
  return dispatch => dispatch({ type: 'EMPLOYEE_CHECKED'})
}


const ITSelected = () => {
  return { type: 'IT_SELECTED' }
}

const ITError = () => {
  return { type: 'IT_ERROR' }
}

const ITConfirmed = () => {
  return { type: 'IT_CONFIRMED' }
}

const employeeSelected = (employeeId) => {
  return { type: 'EMPLOYEE_SELECTED', employeeId }
}

const employeeNotFound = () => {
  return { type: 'EMPLOYEE_NOT_FOUND' }
}

const employeeFound = (response) => {
  return { type: 'EMPLOYEE_FOUND', response }
}

const setUser = (itAdmin, employeeId) => {
  return dispatch => {
    if (itAdmin) {
      dispatch(ITSelected())
      if (itAdmin === '1234') {
        dispatch (ITConfirmed());
      }
      else {
        dispatch(ITError())
      }
    }
    else if (employeeId) {
      employeeId = employeeId.trim().toUpperCase();
      dispatch(employeeSelected(employeeId))
      fetch(`/viewemployee/${employeeId}`, {
        headers: {'Content-Type': 'application/json'}
      })
        .then( response => response.json())
        .then( response => {
          if (response.error) {
            dispatch(employeeNotFound());
          }
          else if (response.id) {
            dispatch(employeeFound(response))
          }
        })
    }
  }
}


const changeUser = () => {
  return dispatch => dispatch({ type: 'CHANGE_USER' })
}


const changeLogo = () => {
  return dispatch => dispatch({ type: 'CHANGE_LOGO' })
}


const saveLogo = (logo) => {
  return dispatch => dispatch ({ type: 'SAVE_LOGO', logo })
}


const searchSubmitted = (search) => {
  return { type: 'SEARCH_SUBMITTED', search }
}

const renderResults = (results) => {
  return { type: 'RENDER_RESULTS', results }
}

const search = searchString => {
  const searchArray = searchString.trim().toUpperCase().split(' ');
  if (searchArray.length === 0) return;

  return dispatch => {
    dispatch(searchSubmitted(searchString));
    if (searchArray.length === 1 || searchArray.length === 3) {
      fetch(`/search/${searchArray[0]}`, {
        headers: {'Content-Type': 'application/json'}
      })
        .then( response => response.json())
        .then( response => {
          dispatch(renderResults(response))
        })
    }
    if (searchArray.length === 2) {
      fetch(`/searchnames/${searchArray[0]}/${searchArray[1]}`, {
        headers: {'Content-Type': 'application/json'}
      })
        .then( response => response.json())
        .then( response => {
          dispatch(renderResults(response))
        })
    }
  }
}


const createProfile = () => {
  return { type: 'CREATE_PROFILE_SUBMITTED'}
}

const newProfile = () => {
  return dispatch => {
    dispatch(createProfile());
  }
}


const employeeSubmitted = () => {
  return { type: 'EMPLOYEE_SUBMITTED' }
}

const missingFieldsNew = (missing, photoError) => {
  return { type: 'MISSING_FIELDS_NEW', missing, photoError }
}

const employeeSaved = (response) => {
  return { type: 'EMPLOYEE_SAVED', response }
}

const employeeFailure = (errorCode, errorDescription) => {
  return { type: 'EMPLOYEE_FAILURE', errorCode, errorDescription }
}

const saveEmployee = employee => {
  return dispatch => {
    dispatch(employeeSubmitted());
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
      .then( photo => {
        if (!photo.ok) {
          photoError = true;
        }
        if (check || photoError) {
          dispatch(missingFieldsNew(missing, photoError));
          return;
        }
        if (!check && !photoError) {
          fetch('/newemployee/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(employee)
          })
            .then( response => response.json())
            .then( response => {
              if (response.error) {
                if (response.error === 'id') {
                  dispatch(employeeFailure('id', employee.ID));
                }
                else if (response.error === 'manager') {
                  dispatch(employeeFailure('manager', employee.Manager_ID));
                }
              }
              else if (response.id) {
                dispatch(employeeSaved(response));
              }
            })
        }
      })
  }
}

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
    fetch(`/viewemployee/${employeeId}`, {
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

    fetch(`/viewemployee/${employeeId}`, {
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
          fetch('/updateemployee/', {
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
    fetch(`/deleteemployee/${employeeId}`, {
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
}


const orgSubmitted = () => {
  return { type: 'ORG_SUBMITTED' }
}

const orgDataReceived = () => {
  return { type: 'ORG_DATA_RECEIVED'}
}

const renderManager = response => {
  return { type: 'RENDER_MANAGER', response }
}

const renderEmployee = response => {
  return { type: 'RENDER_EMPLOYEE', response}
}

const renderPeers = response => {
  return { type: 'RENDER_PEERS', response}
}

const renderReports = response => {
  return { type: 'RENDER_REPORTS', response}
}

const renderOrgChart = org => {
  return dispatch => {
    dispatch(orgSubmitted());

    fetch(`/orgchart/${org.id}/${org.managerId}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        dispatch(orgDataReceived());
        const manager = response[0];
        const employee = [response[1]];
        const reports = response[3];
        const peers = response[2];

        dispatch(renderManager(manager));
        if (org.id != org.managerId){
          dispatch(renderEmployee(employee));
          dispatch(renderReports(reports));
        }
        dispatch(renderPeers(peers));
      })
  }
}


module.exports = { loadCSV, ITChecked, employeeChecked, setUser, changeUser, changeLogo, saveLogo, search, renderProfile, updateProfile, newProfile, saveEmployee, saveUpdate, deleteEmployeeSubmitted, deleteEmployeeNot, deleteProfile, renderOrgChart }
