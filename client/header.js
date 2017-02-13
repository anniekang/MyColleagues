const React = require('react');
const { connect } = require('react-redux');
const { search, renderProfile } = require('./actions')


const Header = ({ searchResults, viewEmployee, handleSubmitSearch, handleSubmitId }) => {
  return (
    <div id="header" className="ui grid container">
      <div id="logo-search" className="ten wide column">
        <div className="ui hidden divider"></div>
        <div className="ui grid">
          <div className="ui medium circular image four wide column">
            <img id="logo" src="data:image/png;base64,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" alt="Company Logo"/>
          </div>
          <div className="twelve wide column">
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
      <div id="find-employee" className= "six wide column">
        <form id="find" className="ui form profile-button" onSubmit= { handleSubmitId }>
          <div className="ui hidden divider"></div>
          <div className="field">
            <label>Employee ID</label>
            <div className="two fields">
              <div className="field">
                { viewEmployee.idSubmitted
                  ? null
                  : <input id="find-id" type="text" name="id" placeholder="Employee ID"/>
                }
              </div>
              <div className="field">
                <button className="ui button" type="submit">View</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

const mapStatetoProps = ({ searchResults, viewEmployee }) => ({ searchResults, viewEmployee })

const mapDispatchtoProps = dispatch => {
  return {
    handleSubmitSearch: event => {
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const searchString = employeeData.get('emp-search');
      dispatch(search(searchString));
    },
    handleSubmitId: event => {
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const employee = {
        id: employeeData.get('id') //.toUpperCase();
      }
      dispatch(renderProfile(employee.id));
    }
  }
};

module.exports = connect(mapStatetoProps, mapDispatchtoProps)(Header);
