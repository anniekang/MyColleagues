const searchSubmitted = (search) => {
  return { type: 'SEARCH_SUBMITTED', search }
}

const renderResults = (results) => {
  return { type: 'RENDER_RESULTS', results }
}

const searchCleared = () => {
  return { type: 'SEARCH_CLEARED' }
}

const search = searchString => {
  const searchArray = searchString.trim().split(' ');
  if (searchArray.length === 0) return;

  return dispatch => {
    dispatch(searchSubmitted(searchString));
    if (searchArray.length === 1 || searchArray.length === 3) {
      const resultsArray = [];
      fetch(`/orgchartemployee/${searchArray[0]}`, {
        headers: {'Content-Type': 'application/json'}
      })
        .then(response => response.json())
        .then(response => {
          if (response.id === searchArray[0]) {
            resultsArray.push(response);
          }
        })
        .then ( () => {
          fetch(`/searchname/${searchArray[0]}`, {
            headers: {'Content-Type': 'application/json'}
          })
            .then(response => response.json())
            .then(response => {
              if (response) {
                response.forEach(result => {
                  resultsArray.push(result);
                })
              }
              dispatch(renderResults(resultsArray))
              document.getElementById('search').reset();
              dispatch(searchCleared());
            })
        })
      }
    if (searchArray === 2) {
      fetch(`/searchnames/${searchArray[0]}/${searchArray[1]}`, {
        headers: {'Content-Type': 'application/json'}
      })
        .then(response => response.json())
        .then(response => {
          dispatch(renderResults(response))
        })
    }

  }
}

const employeeSubmitted = () => {
  return { type: 'EMPLOYEE_SUBMITTED' }
}

const employeeSaved = (response) => {
  return { type: 'EMPLOYEE_SAVED', response }
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
      .then(response => {
        if (response.error) {
          alert(response.error);
          dispatch(employeeFailure());
        }
        else if (response.id) {
          alert(`Employee ${response.id} ${response.first_name} ${response.last_name} succcessfully created!`)
          dispatch(employeeSaved(response));
        }

      })
      .then( () => {
        if (document.getElementById('employee')) {
          document.getElementById('employee').reset();
          dispatch(formCleared());
        }
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
        if (document.getElementById('find-id')) {
          document.getElementById('find').reset();
          dispatch(idCleared());
        }
      })

  }
}

const editForm = (response) => {
  return { type: 'EDIT_FORM', response }
}

const readyToEdit = () => {
  return { type: 'READY_TO_EDIT'}
}

const updateProfile = employeeId => {
  return dispatch => {
    dispatch(idSearch());

    fetch(`/viewemployee/${employeeId}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(response => {
        dispatch(editForm(response));
        document.getElementById('employee-id').value = response.id;
        document.getElementById('employee-first').value = response.first_name;
        document.getElementById('employee-last').value = response.last_name;
        document.getElementById('employee-photo').value = response.photo;
        document.getElementById('employee-title').value = response.job_title;
        document.getElementById('employee-description').value = response.job_description;
        document.getElementById('employee-email').value = response.email;
        document.getElementById('employee-manager').value = response.manager_id;
        dispatch(readyToEdit());
      })
  }
}

const editSubmitted = () => {
  return { type: 'EDIT_SUBMITTED' }
}

const editSaved = response => {
  return { type: 'EDIT_SAVED', response }
}

const saveUpdate = employee => {
  return dispatch => {
    dispatch(editSubmitted());
    fetch('/updateemployee/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(employee)
    })
      .then(response => response.json())
      .then(response => {
          dispatch(editSaved(response))
      })
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
      .then(response => response.json())
      .then(response => {
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

const renderOrgChart = employee => {
  return dispatch => {
    dispatch(orgSubmitted());
    fetch(`/orgchartemployee/${employee.managerId}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(response => {
        const array = [];
        array.push(response);
        dispatch(renderManager(array));
      })
      .then( () => {
        fetch(`/orgchartemployee/${employee.id}`, {
          headers: {'Content-Type': 'application/json'}
        })
          .then(response => response.json())
          .then(response => {
            dispatch(renderEmployee(response));
          })
          .then( () => {
            fetch(`/orgchartpeers/${employee.id}/${employee.managerId}`, {
              headers: {'Content-Type': 'application/json'}
            })
              .then(response => response.json())
              .then(response => {
                dispatch(renderPeers(response))
              })
              .then( () => {
                fetch(`/orgchartreports/${employee.id}`, {
                  headers: {'Content-Type': 'application/json'}
                })
                  .then(response => response.json())
                  .then(response => {
                    dispatch(renderReports(response))
                  })
              })
          })
      })
  }
}


module.exports = { search, saveEmployee, renderProfile, updateProfile, saveUpdate, deleteProfile, renderOrgChart }
