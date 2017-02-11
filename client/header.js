const React = require('react');
const { connect } = require('react-redux');
const { search, renderProfile } = require('./actions')


const Header = ({ handleSubmitSearch, handleSubmitId }) => {
  return (
    <div id="header" className="ui grid container">
      <div id="logo-search" className="ten wide column">
        <div className="ui hidden divider"></div>
        <div className="ui grid">
          <div className="ui medium circular image four wide column">
            <img id="logo" src="/images/wireframe/image.png" alt="Company Logo"/>
          </div>
          <div className="twelve wide column">
            <form id="search" className="ui form" onSubmit={ handleSubmitSearch }>
              <div className="fields">
                <div className="twelve wide field">
                  <input id="emp-search" name="emp-search" type="text" placeholder="ID or First and Last Name"/>
                </div>
                <button className="ui icon button">
                  <i className="search icon"></i>
                </button>
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
                <input id="find-id" type="text" name="id" placeholder="Employee ID"/>
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

module.exports = connect('', mapDispatchtoProps)(Header);
