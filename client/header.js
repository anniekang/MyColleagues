const React = require('react');
const { connect } = require('react-redux');
const { renderProfile } = require('./actions')


const Header = ({ handleSubmit }) => {
  return (
    <div id="find-employee" className= "six wide column">
      <form id="find" className="ui form profile-button" onSubmit= { handleSubmit }>
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
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit: event => {
      event.preventDefault();
      const employeeData = new FormData(event.target);
      const employee = {
        id: employeeData.get('id') //.toUpperCase();
      }
      dispatch(renderProfile(employee.id));

    }
  }
}

module.exports = connect('', mapDispatch)(Header)
