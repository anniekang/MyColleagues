const React = require('react');
const { connect } = require('react-redux');

const Home = ({ currentUser }) => {
  return (
    <div id="home" className="ui centered grid container">
      { currentUser.employeeCheck || currentUser.ITCheck
        ? null
        : <div id="select-user">Please select 'Current User'</div>
      }
    </div>
  )
}

const mapStatetoProps= ({ currentUser }) => ({ currentUser })

module.exports = connect(mapStatetoProps)(Home)
