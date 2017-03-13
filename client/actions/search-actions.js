const employeeSearch = () => {
  return { type: 'EMPLOYEE_SEARCH' }
}

const collaborationSearch = () => {
  return { type: 'COLLABORATION_SEARCH' }
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
      fetch(`/search/names/${searchArray[0]}/${searchArray[1]}`, {
        headers: {'Content-Type': 'application/json'}
      })
        .then( response => response.json())
        .then( response => {
          dispatch(renderResults(response))
        })
    }
  }
}


module.exports = { employeeSearch, collaborationSearch, searchSubmitted, renderResults, search }
