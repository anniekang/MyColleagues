const React = require('react');
const { connect } = require('react-redux');
const { ITSelected, employeeChecked, search, setUser } = require('./actions')


const Header = ({ currentUser, searchResults, handleSubmitSearch, handleSubmitUser, handleClickIt, handleClickEmp }) => {
  const employeeLabel = `Employee '${currentUser.employeeId}'`;

  const defaultPhoto = 'data:image/png;base64,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'
  return (
    <div id="header" className="ui grid container">
      <div id="logo-search" className="twelve wide column">
        <div className="ui grid">
          <div className="ui medium image four wide column">
            <img id="logo" src={ currentUser.logo || defaultPhoto } alt="Company Logo"/>
          </div>
          <div className="twelve wide column">
            <div className="ui hidden divider"></div>
            <div className="ui hidden divider"></div>
            <form id="search" className="ui form" onSubmit={ handleSubmitSearch }>
              <div className="fields">
                <div className="fourteen wide field">
                  { searchResults.searchSubmitted
                    ? null
                    : <input id="emp-search" name="emp-search" type="text" placeholder="ID or First and Last Name"/>
                  }
                </div>
                <div className="two wide field">
                  <button className="ui icon button">
                    <i className="search icon"></i>
                  </button>
                </div>
              </div>
            </form>
            <div>
              { currentUser.employeeFound
                ? <div>Hello { currentUser.employee.first_name } { currentUser.employee.last_name }!</div>
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
                  <label>Current user:</label>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="user" value="IT Admin" tabIndex="1" onChange={ handleClickIt }/>
                    <label>IT Admin</label>
                  </div>
                </div>
                <div className="field">
                  { currentUser.employeeCheck
                    ? <div className="ui centered grid">
                        { currentUser.employeeSelect
                          ? <div className="row">
                              <i className="checkmark icon"></i>
                              <div className="thirteen wide column">
                                <label>{ employeeLabel }</label>
                              </div>
                            </div>
                          : <div className="row">
                              <i className="checkmark icon"></i>
                              <div className="ui small input thirteen wide column">
                                <input id="find-id" type="text" name="id" placeholder="Employee ID"/>
                              </div>
                            </div>
                        }
                      </div>
                    : <div className="ui radio checkbox">
                          <input type="radio" name="user" value="Employee" tabIndex="2" onChange={ handleClickEmp }/>
                          <label>Employee</label>
                      </div>
                  }
                </div>
                <div className="field">
                  { currentUser.selected
                    ? <button className="ui button" type="submit">Change User</button>
                    : <div>
                        { currentUser.IT || currentUser.employeeCheck
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

const mapStatetoProps = ({ currentUser, searchResults }) => ({ currentUser, searchResults })

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
      const employeeData = new FormData(event.target);
      const employee = {
        id: employeeData.get('id').trim().toUpperCase()
      }
      dispatch(setUser(employee.id));
    },
    handleClickIt: event => {
      event.preventDefault();
      dispatch(ITSelected());
    },
    handleClickEmp: event => {
      event.preventDefault();
      dispatch(employeeChecked());
    }
  }
};

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(Header);
