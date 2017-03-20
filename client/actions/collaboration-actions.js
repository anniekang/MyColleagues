const newCollaboration = (employee) => {
  return dispatch => {
    dispatch({ type: 'CREATE_COLLABORATION_SUBMITTED', employeeId: employee.id });
  }
}


const collaborationSubmitted = (collaboration) => {
  return { type: 'COLLABORATION_SUBMITTED', collaboration }
}

const missingFieldsNewCollaboration = (missing) => {
  return { type: 'MISSING_FIELDS_NEW_COLLABORATION', missing }
}

const collaborationSaved = (response) => {
  return { type: 'COLLABORATION_SAVED', response }
}

const collaborationFailure = (errorCode, errorDescription) => {
  return { type: 'COLLABORATION_FAILURE', errorCode, errorDescription }
}

const renderCollaborations = (response) => {
  return { type: 'RENDER_COLLABORATIONS', response }
}

const saveCollaboration = (collaboration, id) => {
  return dispatch => {
    dispatch(collaborationSubmitted(collaboration));
    const missing = [];
    let isMissing = false;
    for (let key in collaboration) {
      if (collaboration[key] === '') {
        missing.push(key);
        isMissing = true;
      }
    }
    if (isMissing) {
      dispatch(missingFieldsNewCollaboration(missing));
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
            if (response.error === 'id') {
              dispatch(collaborationFailure(response.error, collaboration.Collaboration_ID));
            }
            else if (response.error === 'managed_by') {
              dispatch(collaborationFailure(response.error, collaboration.Managed_By));

            }
          }
          else if (response.collaboration_id) {
            dispatch(collaborationSaved(response));
            if (id === collaboration.Managed_By) {
              fetch(`/collaboration/${id}`, {
              headers: {'Content-Type': 'application/json'}
              })
                .then( response => response.json())
                .then( response => {
                  dispatch(renderCollaborations(response));
                })
            }
          }

        })
    }
  }
}

const editCollaborationRequested = () => {
  return { type: 'EDIT_COLLABORATION_REQUESTED' }
}

const editCollaborationForm = (response) => {
  return { type: 'EDIT_COLLABORATION_FORM', response }
}

const updateCollaboration = collaborationID => {
  return dispatch => {
    dispatch(editCollaborationRequested());

    fetch(`/collaboration/${collaborationID}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        dispatch(editCollaborationForm(response[0]));
      })
  }
}

const editCollaborationSubmitted = () => {
  return { type: 'EDIT_COLLABORATION_SUBMITTED' }
}

const missingFieldsEditCollaboration = (missing) => {
  return { type: 'MISSING_FIELDS_EDIT_COLLABORATION', missing }
}

const editCollaborationFailure = (errorDescription) => {
  return { type: 'EDIT_COLLABORATION_FAILURE', errorDescription }
}

const editCollaborationSaved = response => {
  return { type: 'EDIT_COLLABORATION_SAVED', response }
}

const saveCollaborationUpdate = (collaboration, id) => {
  return dispatch => {
    dispatch(editCollaborationSubmitted());
    const missing = [];
    let isMissing = false;
    for (let key in collaboration) {
      if (collaboration[key] === '') {
        missing.push(key);
        isMissing = true;
      }
    }
    if (isMissing) {
      dispatch(missingFieldsEditCollaboration(missing));
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
          if (response.error === 'managed_by') {
            dispatch(editCollaborationFailure(collaboration.Managed_By));
          }
          else if (response.collaboration_id) {
            dispatch(editCollaborationSaved(response));
            if (id === collaboration.Managed_By) {
              fetch(`/collaboration/${id}`, {
              headers: {'Content-Type': 'application/json'}
              })
                .then( response => response.json())
                .then( response => {
                  dispatch(renderCollaborations(response));
                })
            }
          }
        })
    }
  }
}

const deleteCollaborationSubmitted = ( collaborationId ) => {
  return dispatch => {
    dispatch({ type: 'DELETE_COLLABORATION_SUBMITTED', collaborationId })
  }
}

const deleteCollaborationNot = () => {
  return dispatch => dispatch({ type: 'DELETE_COLLABORATION_NOT' })
}

const deleteCollaborationConfirmed = () => {
  return { type: 'DELETE_COLLABORATION_CONFIRMED' }
}

const deleteCollaborationError = () => {
  return { type: 'DELETE_COLLABORATION_ERROR' }
}

const collaborationDeleted = () => {
  return { type: 'COLLABORATION_DELETED' }
}

const deleteCollaboration = collaborationId => {
  return dispatch => {
    dispatch(deleteCollaborationConfirmed());

    fetch(`/collaboration/${collaborationId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then( response => response.json())
      .then( response => {
        if (response.error) {
          dispatch(deleteCollaborationError());
        }
        else if (response.success) {
          dispatch(collaborationDeleted(response));
        }
      })
  }
}


module.exports = { newCollaboration, collaborationSubmitted, missingFieldsNewCollaboration, collaborationSaved, collaborationFailure, saveCollaboration, updateCollaboration, editCollaborationSubmitted, missingFieldsEditCollaboration, editCollaborationFailure, editCollaborationSaved, saveCollaborationUpdate, deleteCollaborationSubmitted, deleteCollaborationNot, deleteCollaborationConfirmed, deleteCollaborationError, collaborationDeleted, deleteCollaboration }
