const React = require('react');
const { connect } = require('react-redux');
const { saveCollaboration, saveCollaborationUpdate } = require('../actions/collaboration-actions');


const Missing = ({ missingFields }) => {
  if (!missingFields) return null;
  return (
    <ul className="error">
      { missingFields.map((key, i) => {
        return <li key={ i }>'{ key }' field required.</li>
      })}
    </ul>
  )
}

const NewError = ({ errorCode, errorDescription }) => {
  if (!errorCode) return null;
  return (
    <ul className="error">
      { errorCode === 'id'
          ? <li>Collaboration ID '{ errorDescription }' already exists.</li>
          : <li>Employee '{ errorDescription }' does not exist.</li>
      }
    </ul>
  )
}

const EditError = ({ errorDescription }) => {
  if (!errorDescription) return null;
  return (
    <ul className="error">
      <li>Employee '{ errorDescription }' does not exist.</li>
    </ul>
  )
}


const EditCollaboration = ( { newCollaboration, editCollaboration, handleSubmit } ) => {
  let isNew = '';
  let collaboration = {};
  let collaborationManagerId = '';
  if (newCollaboration.newCollaboration){
    isNew = true;
    collaboration = newCollaboration;
    collaborationManagerId = newCollaboration.employeeId;
  }
  else if (editCollaboration.editReady) {
    isNew = false;
    collaboration = editCollaboration;
    collaborationManagerId = collaboration.collaboration.managed_by;
  }
  return (
    <div id="edit-collaboration" className="ui grid container">
      < Missing missingFields={ collaboration.missingFields }/>
      < NewError errorCode={ newCollaboration.errorCode } errorDescription={ newCollaboration.errorDescription }/>
      < EditError errorDescription={ editCollaboration.errorDescription }/>

      <form id="collaboration" className="ui ten wide centered column fluid form" onSubmit={ handleSubmit(isNew, collaborationManagerId) }>
        <div className="field">
          <label>Collaboration</label>
        </div>
        <div className="required field">
          <label>Type</label>
          <div className="inline fields">
            <div className="field">
              <div className="ui radio checkbox">
                { editCollaboration.collaboration.type === 'PROJECT' || newCollaboration.newCollaboration
                  ? <input type="radio" name="type" value="project" tabIndex="1" defaultChecked/>
                  : <input type="radio" name="type" value="project" tabIndex="1"/>
                }
                <label>Project</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                { editCollaboration.collaboration.type === 'PRODUCT'
                  ? <input type="radio" name="type" value="product" tabIndex="2" defaultChecked/>
                  : <input type="radio" name="type" value="product" tabIndex="2"/>
                }
                <label>Product</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                { editCollaboration.collaboration.type === 'PROGRAM'
                  ? <input type="radio" name="type" value="program" tabIndex="3" defaultChecked/>
                  : <input type="radio" name="type" value="program" tabIndex="3"/>
                }
                <label>Program</label>
              </div>
            </div>
          </div>
        </div>
        <div className="required field">
          <label>Collaboration ID</label>
          { editCollaboration.editReady
            ? <input id="collaboration-id" type="text" name="collaboration-id" value={ editCollaboration.collaboration.collaboration_id } placeholder="Collaboration ID" readOnly/>
            : <input id="collaboration-id" type="text" name="collaboration-id" placeholder="Collaboration ID"/>
          }
        </div>
        <div className="required field">
          <label>Collaboration Name</label>
          <input id="collaboration-name" type="text" name="collaboration-name" defaultValue={ editCollaboration.collaboration.collaboration_name } placeholder="Collaboration Name"/>
        </div>
        <div id="collaboration-description" className="required field">
          <label>Description</label>
          <textarea id="collaboration-description" rows="2" name="collaboration-description" defaultValue={ editCollaboration.collaboration.description } placeholder="Collaboration Description"></textarea>
        </div>
        <div className="required field">
          <label>Managed By</label>
          { newCollaboration.newCollaboration
            ? <input id="employee-manager" type="text" name="managed-by" defaultValue={ newCollaboration.employeeId } placeholder="Managed By"/>
            : <input id="employee-manager" type="text" name="managed-by" defaultValue={ editCollaboration.collaboration.managed_by } placeholder="Managed By"/>
          }
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui one column centered grid">
          { newCollaboration.newCollaboration
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


const mapStatetoProps = ({ newCollaboration, editCollaboration }) => ({ newCollaboration, editCollaboration })

const mapDispatchtoProps = dispatch => {
  return {
    handleSubmit: (isNew, collaborationManagerId) => event => {
      event.preventDefault();
      const collaborationData = new FormData(event.target);
      const collaboration = {
        Type: collaborationData.get('type').toUpperCase(),
        Collaboration_ID: collaborationData.get('collaboration-id').trim().toUpperCase(),
        Collaboration_Name: collaborationData.get('collaboration-name').trim().toUpperCase(),
        Description: collaborationData.get('collaboration-description').trim(),
        Managed_By: collaborationData.get('managed-by').trim().toUpperCase(),
      };
      const action = isNew ? saveCollaboration : saveCollaborationUpdate;
      dispatch(action(collaboration, collaborationManagerId));
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(EditCollaboration);
