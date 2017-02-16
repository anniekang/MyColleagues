const ITSelected = () => {
  return { type: 'IT_SELECTED'}
}

const userSettings = () => {
  return dispatch => {
    dispatch(ITSelected());
  }
}


const updateLogo = () => {
  return { type: 'UPDATE_LOGO' }
}

const changeLogo = () => {
  return dispatch => {
    dispatch(updateLogo());
  }
}

const submitLogo = (logo) => {
  return { type: 'SUBMIT_LOGO', logo }
}

const saveLogo = (logo) => {
  return dispatch => {
    dispatch(submitLogo(logo))
  }

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

const missingFields = (missing, photoError) => {
  return { type: 'MISSING_FIELDS', missing, photoError }
}

const employeeSaved = (response) => {
  return { type: 'EMPLOYEE_SAVED', response }
}

const employeeFailure = () => {
  return { type: 'EMPLOYEE_FAILURE' }
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
          dispatch(missingFields(missing, photoError));
          return;
        }
      })
      if (!check && !photoError) {
        fetch('/newemployee/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(employee)
        })
          .then( response => response.json())
          .then( response => {
            if (response.error) {
              alert(response.error);
              dispatch(employeeFailure());
            }
            else if (response.id) {
              alert(`Employee ${response.id} ${response.first_name} ${response.last_name} succcessfully created!`)
              dispatch(employeeSaved(response));
            }
          })
      }
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
      })
      if (!check && !photoError) {
        fetch('/updateemployee/', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(employee)
        })
          .then( response => response.json())
          .then( response => {
            if (response.error) {
              alert(response.error);
              dispatch(employeeFailure());
            }
            else if (response.id) {
              dispatch(editSaved(response))
            }
          })
      }
  }
}


const deleteSubmitted = () => {
  return { type: 'DELETE_EMPLOYEE' }
}

const deleteConfirmed = () => {
  return { type: 'DELETE_CONFIRMED' }
}

const deleteError = () => {
  return { type: 'DELETE_ERROR' }
}

const employeeDeleted = () => {
  return { type: 'EMPLOYEE_DELETED' }
}

const deleteProfile = employee => {
  return dispatch => {
    dispatch(deleteSubmitted());
    const confirm = window.confirm(`Are you sure you would like to delete Employee ${employee.id} ${employee.first} ${employee.last}?`);
    if (!confirm) {
      return;
    }
    dispatch(deleteConfirmed());
    fetch(`/deleteemployee/${employee.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        if (response.error) {
          alert(response.error);
          dispatch(deleteError());
        }
        else if (response.success) {
          alert(response.success);
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


module.exports = { userSettings, changeLogo, saveLogo, search, renderProfile, updateProfile, newProfile, saveEmployee, saveUpdate, deleteProfile, renderOrgChart }
