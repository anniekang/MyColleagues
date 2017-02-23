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

const editCollabRequested = () => {
  return { type: 'EDIT__COLLAB_REQUESTED' }
}

const editCollabForm = (response) => {
  return { type: 'EDIT_COLLAB_FORM', response }
}

const updateCollab = collabName => {
  return dispatch => {
    dispatch(editCollabRequested());

    fetch(`/collaboration/${collabName}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        dispatch(editCollabForm(response));
      })
  }
}

const editCollabSubmitted = (collabType) => {
  return { type: 'EDIT_COLLAB_SUBMITTED', collabType }
}

const missingFieldsEditCollab = (missing) => {
  return { type: 'MISSING_FIELDS_EDIT_COLLAB', missing }
}

const editCollabFailure = (errorDescription) => {
  return { type: 'EDIT_COLLAB_FAILURE', errorDescription }
}

const editCollabSaved = response => {
  return { type: 'EDIT_COLLAB_SAVED', response }
}

const saveCollabUpdate = (collaboration, id) => {
  return dispatch => {
    dispatch(editCollabSubmitted(collaboration.type));
    const missing = [];
    let isMissing = false;
    for (let key in collaboration) {
      if (collaboration[key] === '') {
        missing.push(key);
        isMissing = true;
      }
    }
    if (isMissing) {
      dispatch(missingFieldsEditCollab(missing));
      return;
    }
    else {
      fetch('/collaboration', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(collaboration)
      })
        .then( response => response.json())
        .then( response => {
          if (response.error === 'manager') {
            dispatch(editCollabFailure(collaboration.Managed_By));
          }
          else if (response.id) {
            dispatch(editCollabSaved(response));
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



module.exports = { newCollab, collabSubmitted, missingFieldsNewCollab, collabSaved, collabFailure, saveCollab, updateCollab, editCollabSubmitted, missingFieldsEditCollab, editCollabFailure, editCollabSaved, saveCollabUpdate }
