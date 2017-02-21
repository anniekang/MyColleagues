const React = require('react');
const { connect } = require('react-redux');
const { saveCollab } = require('../actions/collaboration-actions');


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
/*
const NewError = ({ newEmployee }) => {
  const { errorCode, errorDescription } = newEmployee;
  if (!errorCode) return null;
  return (
    <ul className="error">
      { errorCode === 'id'
          ? <li>Employee '{ errorDescription }' already exists.</li>
          : <li>Manager '{ errorDescription }' does not exist.</li>
      }
    </ul>
  )
}

< NewError newEmployee={ newEmployee }/>
*/


const EditCollaboration = ( { currentUser, newCollab, handleSubmit } ) => {
  const collaborators = `${newCollab.employeeId}, `;
  let isNew = '';
  let collab = {};
  if (newCollab.newCollab){
    isNew = true;
    collab = newCollab;
  }
  /*else if (editEmployee.editReady) {
    isNew = false;
    employee = editEmployee;
  }*/

  return (
    <div id="edit-collab" className="ui grid container">
      < Missing collab={ collab }/>
      <form id="collaboration" className="ui ten wide centered column fluid form" onSubmit={ handleSubmit(isNew) }>
        <div className="field">
          <label>Collaboration</label>
        </div>
        <div className="required field">
          <label>Type</label>
          <div className="inline fields">
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="type" value="project" tabIndex="1" defaultChecked/>
                <label>Project</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="type" value="product" tabIndex="2"/>
                <label>Product</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="type" value="program" tabIndex="3"/>
                <label>Program</label>
              </div>
            </div>
          </div>
        </div>
        <div className="required field">
          <label>Collaboration Name</label>
          <input id="collab-name" type="text" name="collab-name" placeholder="Collaboration Name"/>
        </div>
        <div id="collab-description" className="required field">
          <label>Description</label>
          <textarea id="collab-description" rows="2" name="collab-description" placeholder="Collaboration Description"></textarea>
        </div>
        <div className="required field">
          <label>Managed By</label>
          { (currentUser.employeeFound && newCollab.employeeId === currentUser.employeeId) || currentUser.ITConfirmed
            ? <input id="employee-manager" type="text" name="managed-by" defaultValue={ newCollab.employeeId } placeholder="Managed By"/>
            : <input id="employee-manager" type="text" name="managed-by" value={ newCollab.employeeId } placeholder="Managed By" readOnly/>
          }

        </div>
        <div className="ui hidden divider"></div>
        <div className="ui one column centered grid">
          <button className="ui button" type="submit">Submit</button>
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui hidden divider"></div>
      </form>
    </div>
  )
}


const mapStatetoProps = ({ currentUser, newCollab }) => ({ currentUser, newCollab })
const mapDispatchtoProps = dispatch => {
  return {
    handleSubmit: isNew => event => {
      event.preventDefault();
      const collabData = new FormData(event.target);
      const collaboration = {
        Type: collabData.get('type').toUpperCase(),
        Collaboration_Name: collabData.get('collab-name').trim().toUpperCase(),
        Description: collabData.get('collab-description').trim(),
        Managed_By: collabData.get('managed-by').trim().toUpperCase(),
      };
      const action = isNew ? saveCollab : null;
      dispatch(action(collaboration));
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(EditCollaboration);
