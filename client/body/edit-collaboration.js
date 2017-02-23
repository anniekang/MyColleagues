const React = require('react');
const { connect } = require('react-redux');
const { saveCollab, saveCollabUpdate } = require('../actions/collaboration-actions');


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





const EditCollaboration = ( { newCollab, editCollab, handleSubmit } ) => {
  let isNew = '';
  let collab = {};
  let id = '';
  if (newCollab.newCollab){
    isNew = true;
    collab = newCollab;
    id = newCollab.employeeId;
  }
  else if (editCollab.editReady) {
    isNew = false;
    collab = editCollab;
    id = collab.collaboration.managed_by;
  }
  console.log(id)
  return (
    <div id="edit-collab" className="ui grid container">
      < Missing missingFields={ collab.missingFields }/>
      < NewError errorCode={ newCollab.errorCode } errorDescription={ newCollab.errorDescription }/>
      < EditError errorDescription={ editCollab.errorDescription }/>

      <form id="collaboration" className="ui ten wide centered column fluid form" onSubmit={ handleSubmit(isNew, id) }>
        <div className="field">
          <label>Collaboration</label>
        </div>
        <div className="required field">
          <label>Type</label>
          <div className="inline fields">
            <div className="field">
              <div className="ui radio checkbox">
                { editCollab.collaboration.type === 'PROJECT' || newCollab.newCollab
                  ? <input type="radio" name="type" value="project" tabIndex="1" defaultChecked/>
                  : <input type="radio" name="type" value="project" tabIndex="1"/>
                }
                <label>Project</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                { editCollab.collaboration.type === 'PRODUCT'
                  ? <input type="radio" name="type" value="product" tabIndex="2" defaultChecked/>
                  : <input type="radio" name="type" value="product" tabIndex="2"/>
                }
                <label>Product</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                { editCollab.collaboration.type === 'PROGRAM'
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
          { editCollab.editReady
            ? <input id="collab-id" type="text" name="collab-id" value={ editCollab.collaboration.collaboration_id } placeholder="Collaboration ID" readOnly/>
            : <input id="collab-id" type="text" name="collab-id" placeholder="Collaboration ID"/>
          }
        </div>
        <div className="required field">
          <label>Collaboration Name</label>
          <input id="collab-name" type="text" name="collab-name" defaultValue={ editCollab.collaboration.collaboration_name } placeholder="Collaboration Name"/>
        </div>
        <div id="collab-description" className="required field">
          <label>Description</label>
          <textarea id="collab-description" rows="2" name="collab-description" defaultValue={ editCollab.collaboration.description } placeholder="Collaboration Description"></textarea>
        </div>
        <div className="required field">
          <label>Managed By</label>
          { newCollab.newCollab
            ? <input id="employee-manager" type="text" name="managed-by"    defaultValue={ newCollab.employeeId } placeholder="Managed By"/>
            : <input id="employee-manager" type="text" name="managed-by" defaultValue={ editCollab.collaboration.managed_by } placeholder="Managed By"/>
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


const mapStatetoProps = ({ newCollab, editCollab }) => ({ newCollab, editCollab })

const mapDispatchtoProps = dispatch => {
  return {
    handleSubmit: (isNew, id) => event => {
      event.preventDefault();
      const collabData = new FormData(event.target);
      const collaboration = {
        Type: collabData.get('type').toUpperCase(),
        Collaboration_ID: collabData.get('collab-id').trim().toUpperCase(),
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
