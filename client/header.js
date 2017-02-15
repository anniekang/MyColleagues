const React = require('react');
const { connect } = require('react-redux');
const { userSettings, search, renderProfile } = require('./actions')


const Header = ({ currentUser, searchResults, viewEmployee, handleSubmitSearch, handleSubmitId, handleClickIt }) => {
  const defaultPhoto = '//placehold.it/400/bababa/000000/?text=Company+Logo'
  console.log(currentUser.logo)
  return (
    <div id="header" className="ui grid container">
      <div id="logo-search" className="twelve wide column">
        <div className="ui hidden divider"></div>
        <div className="ui grid">
          <div className="ui medium image four wide column">
            <img id="logo" src={ currentUser.logo || defaultPhoto } alt="Company Logo"/>
          </div>
          <div className="twelve wide column">
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
          </div>
        </div>
      </div>
      <div id="user" className= "four wide column">
        <div className="ui grid">
          <div className="ui hidden divider"></div>
          <form id="set-user" className="ui form" onSubmit={ handleSubmitId }>
            <div className="grouped fields">
              <label htmlFor="user">Current user:</label>
              <div className="field">
                <div className="ui radio checkbox four wide column">
                  <input type="radio" name="user" value="IT Admin" tabIndex="1" onClick={ handleClickIt}/>
                  <label>IT Admin</label>
                </div>
              </div>
              <div className="fields inline">
                <div className="field">
                  <div className="ui radio checkbox four wide column">
                    <input type="radio" name="user" value="Employee" tabIndex="2"/>
                    <label>Employee</label>
                  </div>
                </div>
                <div className="field six wide column">
                  { viewEmployee.idSubmitted
                    ? null
                    : <input id="find-id" type="text" name="id" placeholder="ID"/>
                  }
                </div>
              </div>
              <div className="field">
                <button className="ui button" type="submit">View</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

const mapStatetoProps = ({ currentUser, searchResults, viewEmployee }) => ({ currentUser, searchResults, viewEmployee })

const mapDispatchtoProps = dispatch => {
  return {
    handleSubmitSearch: event => {
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const searchString = employeeData.get('emp-search');
      dispatch(search(searchString));
    },
    handleSubmitId: event => {
      console.log('id')
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const employee = {
        id: employeeData.get('id')
      }
      dispatch(renderProfile(employee.id));
    },
    handleClickIt: event => {
      console.log('it')
      event.preventDefault();
      dispatch(userSettings());
    }
  }
};

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(Header);
