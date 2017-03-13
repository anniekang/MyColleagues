const React = require('react');
const { connect } = require('react-redux');
const { ITChecked, employeeChecked, changeUser, setUser } = require('./actions/employee-actions');
const { search, employeeSearch, collaborationSearch } = require('./actions/search-actions');
const { deleteCollab, deleteCollabNot } = require('./actions/collaboration-actions');


const Header = ({ currentUser, searchType, searchResults, editEmployee, viewEmployee, newCollab, editCollab, deleteCollab, handleSubmitSearch, handleSubmitUser, handleClick }) => {
  const defaultPhoto = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRp2fY5IddQ51unoSD0p2tQdwWnjdMKUaOZ5ONfnTnv7WSaP4v4zg';
  const yesButtonCollab = `ui button ${ deleteCollab.collabId }`;
  let employeeSearchCheck = '';
  let collaborationSearchCheck = '';
  if (searchType.employee) {
    employeeSearchCheck = 'true';
    collaborationSearchCheck = '';
  }
  else {
    employeeSearchCheck = '';
    collaborationSearchCheck = 'true';
  }

  return (
    <div id="header" className="ui grid container">
      <div id="logo-search" className="twelve wide column">
        <div className="ui grid">
          <div className="ui medium image four wide column centered">
            <img id="logo" src={ currentUser.logo || defaultPhoto } alt="Company Logo"/>
          </div>
          <div className="twelve wide column">
            <div id="my-colleagues">MyColleagues</div>
            <div className="ui hidden divider"></div>
            <form id="search" className="ui form" onSubmit={ handleSubmitSearch }>
                  { currentUser.employeeFound || currentUser.ITConfirmed
                    ? <div>
                        { searchResults.searchSubmitted
                          ? null
                          : <div>
                              <div className="inline fields">
                                <div className="field">
                                  <div className="ui radio checkbox">
                                    <input type="radio" name="searchType" tabIndex="1" onChange={ handleClick('employeeSearch') } checked={ employeeSearchCheck }/>
                                    <label>Employee</label>
                                  </div>
                                </div>
                                <div className="field">
                                  <div className="ui radio checkbox">
                                    <input type="radio" name="searchType" tabIndex="2" onChange={ handleClick('collaborationSearch') } checked={ collaborationSearchCheck }/>
                                    <label>Collaboration</label>
                                  </div>
                                </div>
                                </div>
                            <div className="fields">
                              <div className="fourteen wide field">
                                { searchType.employee
                                  ? <input id="emp-search" name="emp-search" type="text" placeholder="Employee ID or First and Last Name"/>
                                  : <input id="collab-search" name="collab-search" type="text" placeholder="Collaboration ID or Name"/>
                                }
                              </div>
                              <div className="two wide field">
                                <button className="ui icon button">
                                  <i className="search icon"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    : null
                  }
            </form>
            <div className="ui hidden divider"></div>
            <div className="ui centered grid">
              { currentUser.employeeFound
                ? <div>
                    <div>Hello { currentUser.employee.first_name } { currentUser.employee.last_name }!</div>
                    { editEmployee.saved
                      ? <div className="centered row">
                          <div>Employee '{viewEmployee.employee.id} {viewEmployee.employee.first_name} {viewEmployee.employee.last_name}' successfully updated!</div>
                        </div>
                      : null
                    }
                    { newCollab.saved
                      ? <div className="centered row">
                          <div>{ newCollab.collaboration.type } { newCollab.collaboration.collaboration_id } successfully created!</div>
                        </div>
                      : null
                    }
                    { editCollab.saved
                      ? <div className="centered row">
                          <div>{ editCollab.collaboration.type } { editCollab.collaboration.collaboration_id } successfully updated!</div>
                        </div>
                      : null
                    }
                    { deleteCollab.deleteSubmitted
                      ? <div className="centered row">
                          <div className="ui centered grid">
                            <div className="centered row">
                              <div>Are you sure you would like to delete Collaboration '{ deleteCollab.collabId }'?</div>
                            </div>
                            <div className="centered row">
                              <button className={ yesButtonCollab } type='submit' onClick={ handleClick('yesCollab') }>Yes</button>
                              <button className='ui button' type='submit' onClick={ handleClick('noCollab') }>No</button>
                            </div>
                          </div>
                        </div>
                      : null
                    }
                    { deleteCollab.deleted
                      ? <div className="centered row">
                          <div>Collaboration '{ deleteCollab.collabId }' has been deleted.</div>
                        </div>
                      : null
                    }
                    { deleteCollab.error
                      ? <div className="centered row">
                          <div>Collaboration '{ deleteCollab.collabId }' still exists.</div>
                        </div>
                      : null
                    }
                  </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
      <div id="user" className= "four wide column">
        <div className="ui centered grid">
          <div className="fourteen wide column">
            <form id="set-user" className="ui form" onSubmit={ handleSubmitUser }>
              <div className="grouped fields ui centered grid">
                <div>
                  <label id="current-user">Current user:</label>
                </div>
                <div className="field">
                  { currentUser.employeeFound
                    ? null
                    : <div>
                      { currentUser.ITCheck
                        ? <div className="ui centered grid">
                            { currentUser.ITConfirmed
                              ? <div className="row">
                                  <i className="checkmark icon"></i>
                                  <div className="thirteen wide column">
                                    <label>IT Administrator</label>
                                  </div>
                                </div>
                              : <div className="row">
                                  <i className="checkmark icon"></i>
                                  <div className="ui small input thirteen wide column">
                                    <input id="IT-pin" type="text" name="pin" placeholder="1234"/>
                                  </div>
                                  { currentUser.ITError
                                    ? <ul className="user-error">
                                        <li>Please re-enter pin</li>
                                      </ul>
                                    : null
                                  }
                              </div>
                            }
                          </div>
                        : <div className="ui radio checkbox">
                              <input type="radio" name="user" value="IT Admin" tabIndex="1" onChange={ handleClick('IT') }/>
                              <label>IT Administrator</label>
                          </div>
                      }
                      </div>
                  }
                </div>
                <div className="field">
                  { currentUser.ITConfirmed
                    ? null
                    : <div>
                        { currentUser.employeeCheck
                          ? <div className="ui centered grid">
                              { currentUser.employeeFound
                                ? <div className="row">
                                    <i className="checkmark icon"></i>
                                    <div className="thirteen wide column">
                                      <label>Employee '{ currentUser.employeeId }'</label>
                                    </div>
                                  </div>
                                : <div className="row">
                                    <i className="checkmark icon"></i>
                                    <div className="ui small input thirteen wide column">
                                      <input id="find-id" type="text" name="id" placeholder="Employee ID"/>
                                    </div>
                                    { currentUser.employeeError
                                      ? <ul className="error">
                                          <li>Employee { currentUser.employeeId } does not exist.</li>
                                        </ul>
                                      : null
                                    }
                                  </div>
                              }
                            </div>
                          : <div className="ui radio checkbox">
                                <input type="radio" name="user" value="Employee" tabIndex="2" onChange={ handleClick('Emp') }/>
                                <label>Employee</label>
                            </div>
                        }
                      </div>
                  }
                </div>
                <div className="field">
                  { currentUser.employeeFound || currentUser.ITConfirmed
                    ? <button className="ui button" type="submit" onClick= { handleClick('Change') }>Change User</button>
                    : <div>
                        { currentUser.ITCheck || currentUser.employeeCheck
                          ? <button className="ui button" type="submit">View As</button>
                          : null
                        }
                      </div>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStatetoProps = ({ currentUser, searchType, searchResults, editEmployee, viewEmployee, newCollab, editCollab, deleteCollab }) => ({ currentUser, searchType, searchResults, editEmployee, viewEmployee, newCollab, editCollab, deleteCollab })

const mapDispatchtoProps = dispatch => {
  return {
    handleSubmitSearch: event => {
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const searchString = employeeData.get('emp-search');
      dispatch(search(searchString));
    },
    handleSubmitUser: event => {
      event.preventDefault();
      const userData = new FormData(event.target);
      const ITAdmin = userData.get('pin');
      const employeeId = userData.get('id');
      dispatch(setUser(ITAdmin, employeeId));
    },
    handleClick: key => event => {
      event.preventDefault();
      if (key === 'IT') dispatch(ITChecked())
      else if (key === 'Emp') dispatch(employeeChecked())
      else if (key === 'Change') dispatch(changeUser())
      else if (key === 'employeeSearch') dispatch(employeeSearch())
      else if (key === 'collaborationSearch') dispatch(collaborationSearch())
      else if (key === 'yesCollab') dispatch(deleteCollab(event.target.classList[2].toUpperCase()))
      else if (key === 'noCollab') dispatch(deleteCollabNot())
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(Header);
