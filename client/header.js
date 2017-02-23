const React = require('react');
const { connect } = require('react-redux');
const { ITChecked, employeeChecked, changeUser, setUser } = require('./actions/employee-actions')
const { search } = require('./actions/search-actions')


const Header = ({ currentUser, searchResults, editEmployee, viewEmployee, newCollab, handleSubmitSearch, handleSubmitUser, handleClick }) => {
  const defaultPhoto = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRp2fY5IddQ51unoSD0p2tQdwWnjdMKUaOZ5ONfnTnv7WSaP4v4zg';

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
              <div className="fields">
                <div className="fourteen wide field">
                  { currentUser.employeeFound || currentUser.ITConfirmed
                    ? <div>
                        { searchResults.searchSubmitted
                          ? null
                          : <input id="emp-search" name="emp-search" type="text" placeholder="Employee ID or First and Last Name"/>
                        }
                      </div>
                    : null
                  }
                </div>
                <div className="two wide field">
                  { currentUser.employeeFound || currentUser.ITConfirmed
                    ? <button className="ui icon button">
                        <i className="search icon"></i>
                      </button>
                    : null
                  }
                </div>
              </div>
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
                          <div>{ newCollab.collaboration.Type } { newCollab.collaboration.Collaboration_ID } successfully created!</div>
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

const mapStatetoProps = ({ currentUser, searchResults, editEmployee, viewEmployee, newCollab }) => ({ currentUser, searchResults, editEmployee, viewEmployee, newCollab })

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
    handleClick: user => event => {
      event.preventDefault();
      if (user === 'IT') dispatch(ITChecked())
      else if (user === 'Emp') dispatch(employeeChecked());
      else if (user === 'Change') dispatch(changeUser());
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(Header);
