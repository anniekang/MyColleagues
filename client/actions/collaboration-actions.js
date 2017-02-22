const newCollab = (employee) => {
  return dispatch => {
    dispatch({ type: 'CREATE_COLLAB_SUBMITTED', employeeId: employee.id });
  }
}


const collabSubmitted = (collabType) => {
  return { type: 'COLLAB_SUBMITTED', collabType }
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

const renderCollabs = (response) => {
  return { type: 'RENDER_COLLABS', response }
}

const saveCollab = (collaboration, id) => {
  return dispatch => {
    dispatch(collabSubmitted(collaboration.Type));
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
          if (response.error) {
            dispatch(collabFailure(collaboration.Managed_By));
          }
          else if (response.type) {
            dispatch(collabSaved(response));
            if (id === collaboration.Managed_By) {
              fetch(`/collaboration/${id}`, {
              headers: {'Content-Type': 'application/json'}
              })
                .then( response => response.json())
                .then( response => {
                  dispatch(renderCollabs(response));
                })
              }
          }

        })
    }
  }
}


module.exports = { newCollab, collabSubmitted, missingFieldsNewCollab, collabSaved, collabFailure, saveCollab }
