const DEFAULTPHOTO = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';

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
  const searchArray = searchString.trim().split(' ');
  if (searchArray.length === 0) return;

  return dispatch => {
    dispatch(searchSubmitted(searchString));
    if (searchArray.length === 1 || searchArray.length === 3) {
      fetch(`/search/${searchArray[0]}`, {
        headers: {'Content-Type': 'application/json'}
      })
        .then(response => response.json())
        .then(response => {
          dispatch(renderResults(response))
        })
    }
    if (searchArray.length === 2) {
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
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          alert(response.error);
          dispatch(idNotFound());
        }
        else if (response.id) {
          fetch(response.photo)
            .then(photo => {
              if (photo.status === 404 || response.photo === '') {
                response.photo = DEFAULTPHOTO;
              }
              dispatch(idFound(response))
            })

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
      .then(photo => {
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
          .then(response => response.json())
          .then(response => {
            if (response.error) {
              alert(response.error);
              dispatch(employeeFailure());
            }
            else if (response.id) {
              alert(`Employee ${response.id} ${response.first_name} ${response.last_name} succcessfully created!`)
              fetch(response.photo)
                .then(photo => {
                  if (photo.status === 404 || response.photo === '') {
                    response.photo = DEFAULTPHOTO;
                  }
                  dispatch(employeeSaved(response));
                })
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
      .then(response => response.json())
      .then(response => {
        dispatch(editForm(response));
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
        fetch(response.photo)
          .then(photo => {
            if (photo.status === 404 || response.photo === '') {
              response.photo = DEFAULTPHOTO;
            }
            dispatch(editSaved(response))
          })
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
      .then(response => response.json())
      .then(response => {
        dispatch(orgDataReceived());
        const manager = response[0];
        const employee = [response[1]];
        const reports = response[3];
        const peers = response[2];

        dispatch(renderManager(manager));
        if (org.id != org.maangerID){
          dispatch(renderEmployee(employee));
          dispatch(renderReports(reports));
        }
        dispatch(renderPeers(peers));
      })
  }
}


module.exports = { userSettings, changeLogo, saveLogo, search, renderProfile, updateProfile, newProfile, saveEmployee, saveUpdate, deleteProfile, renderOrgChart }
