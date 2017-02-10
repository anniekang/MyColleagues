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
          console.log(response)
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
        console.log('test1')
        console.log(response);
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
    console.log('test5')
    console.log(employee)
    fetch('/updateemployee/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(employee)
    })
      .then(response => response.json())
      .then(response => {
          console.log('test2')
          console.log(response)
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
        console.log(response)
        dispatch(renderManager(response));
      })
      .then( () => {
        fetch(`/orgchartemployee/${employee.id}`, {
          headers: {'Content-Type': 'application/json'}
        })
          .then(response => response.json())
          .then(response => {
            console.log(response)
            dispatch(renderEmployee(response));
          })
          .then( () => {
            fetch(`/orgchartpeers/${employee.id}/${employee.managerId}`, {
              headers: {'Content-Type': 'application/json'}
            })
              .then(response => response.json())
              .then(response => {
                console.log(response)
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


module.exports = { saveEmployee, renderProfile, updateProfile, saveUpdate, deleteProfile, renderOrgChart }
