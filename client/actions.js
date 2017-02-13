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


const employeeSubmitted = () => {
  return { type: 'EMPLOYEE_SUBMITTED' }
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
          fetch(response.photo)
            .then(photo => {
              if (photo.status === 404 || response.photo === '') {
                response.photo = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';
              }
            })

          dispatch(idFound(response))
        }
      })
  }
}


const editRequest = () => {
  return { type: 'EDIT_REQUESTED' }
}

const editForm = (response) => {
  return { type: 'EDIT_FORM', response }
}

const updateProfile = employeeId => {
  return dispatch => {
    dispatch(editRequest());

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
        fetch(response.photo)
          .then(photo => {
            if (photo.status === 404 || response.photo === '') {
              response.photo = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';
            }
          })

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
            if (employee.managerId === employee.id) {
              response = {};
            }
            fetch(response.photo)
              .then(photo => {
                if (photo.status === 404 || response.photo === '') {
                  response.photo = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';
                }
              })

            dispatch(renderEmployee(response));
          })
          .then( () => {
            fetch(`/orgchartpeers/${employee.id}/${employee.managerId}`, {
              headers: {'Content-Type': 'application/json'}
            })
              .then(response => response.json())
              .then(response => {
                for (let key in response) {
                  fetch(response[key].photo)
                    .then(photo => {
                      if (photo.status === 404 || response[key].photo === '') {
                        response[key].photo = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';
                      }
                    })
                }

                dispatch(renderPeers(response))
              })
              .then( () => {
                fetch(`/orgchartreports/${employee.id}`, {
                  headers: {'Content-Type': 'application/json'}
                })
                  .then(response => response.json())
                  .then(response => {
                    if (employee.managerId === employee.id) {
                      response = {};
                    }
                    for (let key in response) {
                      fetch(response[key].photo)
                        .then(photo => {
                          if (photo.status === 404 || response[key].photo === '') {
                            response[key].photo = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';
                          }
                        })
                    }

                    dispatch(renderReports(response))
                  })
              })
          })
      })
  }
}


module.exports = { search, saveEmployee, renderProfile, updateProfile, saveUpdate, deleteProfile, renderOrgChart }
