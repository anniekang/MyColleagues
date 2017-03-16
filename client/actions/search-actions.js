const employeeSearch = () => {
  return { type: 'EMPLOYEE_SEARCH' }
}

const collaborationSearch = () => {
  return { type: 'COLLABORATION_SEARCH' }
}

const searchSubmitted = (isEmployee, search) => {
  return { type: 'SEARCH_SUBMITTED', isEmployee, search }
}

const renderEmployeeResults = (results) => {
  return { type: 'RENDER_EMPLOYEE_RESULTS', results }
}

const renderCollaborationResults = (results) => {
  return { type: 'RENDER_COLLABORATION_RESULTS', results }
}

const search = (isEmployee, searchString) => {
  const searchArray = searchString.trim().toUpperCase().split(' ');
  if (searchArray.length === 0) return;

  return dispatch => {
    dispatch(searchSubmitted(isEmployee, searchString));
    if (isEmployee) {
      if (searchArray.length === 1 || searchArray.length === 3) {
        fetch(`/search/employee/${searchArray[0]}`, {
          headers: {'Content-Type': 'application/json'}
        })
          .then( response => response.json())
          .then( response => {
            dispatch(renderEmployeeResults(response))
          })
      }
      else if (searchArray.length === 2) {
        fetch(`/search/employee/names/${searchArray[0]}/${searchArray[1]}`, {
          headers: {'Content-Type': 'application/json'}
        })
          .then( response => response.json())
          .then( response => {
            dispatch(renderEmployeeResults(response))
          })
      }
    }
    else {
      if (searchArray.length === 1) {
        fetch(`/search/collaboration/${searchArray[0]}`, {
          headers: {'Content-Type': 'application/json'}
        })
          .then( response => response.json())
          .then( response => {
            dispatch(renderCollaborationResults(response))
          })
      }
      else {
        let thirdWord = '&&&';
        if (searchArray[2]) thirdWord = searchArray[2];
        let fourthWord = '&&&';
        if (searchArray[3]) fourthWord = searchArray[3];
        let fifthWord = '&&&';
        if (searchArray[4]) fifthWord = searchArray[4];

        fetch(`/search/collaboration/name/${searchArray[0]}/${searchArray[1]}/${thirdWord}/${fourthWord}/${fifthWord}`, {
          headers: {'Content-Type': 'application/json'}
        })
          .then( response => response.json())
          .then( response => {
            dispatch(renderCollaborationResults(response))
          })
      }
    }
  }
}


module.exports = { employeeSearch, collaborationSearch, searchSubmitted, renderEmployeeResults, renderCollaborationResults, search }
