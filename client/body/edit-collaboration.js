const React = require('react');
const { connect } = require('react-redux');
const { saveCollab, saveCollabUpdate } = require('../actions/collaboration-actions');


const Missing = ({ collab }) => {
  const { missingFields } = collab;
  if (!missingFields) return null;
  return (
    <ul className="error">
      { missingFields.map((key, i) => {
        return <li key={ i }>'{ key }' field required.</li>
      })}
    </ul>
  )
}

const Error = ({ newCollabError, editCollabError }) => {
  if (!newCollabError && !editCollabError) return null;
  return (
    <ul className="error">
      { newCollabError
        ? <li>Managed_By ID '{ newCollabError}' does not exist.</li>
        : <li>Managed_By ID '{ editCollabError }' does not exist.</li>
      }
    </ul>
  )
}


const EditCollaboration = ( { currentUser, newCollab, editCollab, handleSubmit } ) => {
  let isNew = '';
  let collab = {};
  if (newCollab.newCollab){
    isNew = true;
    collab = newCollab;
  }
  else if (editCollab.editReady) {
    isNew = false;
    collab = editCollab;
  }

  return (
    <div id="edit-collab" className="ui grid container">
      < Missing collab={ collab }/>
      < Error newCollabError={ newCollab.errorDescription } editCollabError={ editCollab.errorDescription }/>
      <form id="collaboration" className="ui ten wide centered column fluid form" onSubmit={ handleSubmit(isNew, newCollab.employeeId) }>
        <div className="field">
          <label>Collaboration</label>
        </div>
        <div className="required field">
          <label>Type</label>
          <div className="inline fields">
            <div className="field">
              <div className="ui radio checkbox">
                { editCollab.collab[0].type === 'PROJECT' || newCollab.newCollab
                  ? <input type="radio" name="type" value="project" tabIndex="1" defaultChecked/>
                  : <input type="radio" name="type" value="project" tabIndex="1"/>
                }
                <label>Project</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                { editCollab.collab[0].type === 'PRODUCT'
                  ? <input type="radio" name="type" value="product" tabIndex="2" defaultChecked/>
                  : <input type="radio" name="type" value="product" tabIndex="2"/>
                }
                <label>Product</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                { editCollab.collab[0].type === 'PROGRAM'
                  ? <input type="radio" name="type" value="program" tabIndex="3" defaultChecked/>
                  : <input type="radio" name="type" value="program" tabIndex="3"/>
                }
                <label>Program</label>
              </div>
            </div>
          </div>
        </div>
        <div className="required field">
          <label>Collaboration Name</label>
          <input id="collab-name" type="text" name="collab-name" defaultValue={ editCollab.collab[0].collaboration_name } placeholder="Collaboration Name"/>
        </div>
        <div id="collab-description" className="required field">
          <label>Description</label>
          <textarea id="collab-description" rows="2" name="collab-description" defaultValue={ editCollab.collab[0].description } placeholder="Collaboration Description"></textarea>
        </div>
        <div className="required field">
          <label>Managed By</label>
          { newCollab.newCollab
            ? <div>
                { (currentUser.employeeFound && newCollab.employeeId === currentUser.employeeId) || currentUser.ITConfirmed
                  ? <input id="employee-manager" type="text" name="managed-by" defaultValue={ newCollab.employeeId } placeholder="Managed By"/>
                  : <input id="employee-manager" type="text" name="managed-by" value={ newCollab.employeeId } placeholder="Managed By" readOnly/>
                }
              </div>
            : <div>
                { (currentUser.employeeFound && newCollab.employeeId === currentUser.employeeId) || currentUser.ITConfirmed
                  ? <input id="employee-manager" type="text" name="managed-by" defaultValue={ editCollab.collab[0].managed_by } placeholder="Managed By"/>
                  : <input id="employee-manager" type="text" name="managed-by" value={ editCollab.collab[0].managed_by } placeholder="Managed By" readOnly/>
                }
              </div>
          }
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui one column centered grid">
          { newCollab.newCollab
            ? <button className="ui button" type="submit">Create</button>
            : <button className="ui button" type="submit">Submit</button>
          }
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui hidden divider"></div>
      </form>
    </div>
  )
}


const mapStatetoProps = ({ currentUser, newCollab, editCollab }) => ({ currentUser, newCollab, editCollab })

const mapDispatchtoProps = dispatch => {
  return {
    handleSubmit: (isNew, id) => event => {
      event.preventDefault();
      const collabData = new FormData(event.target);
      const collaboration = {
        Type: collabData.get('type').toUpperCase(),
        Collaboration_Name: collabData.get('collab-name').trim().toUpperCase(),
        Description: collabData.get('collab-description').trim(),
        Managed_By: collabData.get('managed-by').trim().toUpperCase(),
      };
      const action = isNew ? saveCollab : saveCollabUpdate;
      dispatch(action(collaboration, id));
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(EditCollaboration);
