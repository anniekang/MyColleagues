const React = require('react');
const { connect } = require('react-redux');
const { loadCSV } = require('../actions/employee-actions')


const Home = ({ currentUser, handleClick }) => {

  return (
    <div id="home" className="ui centered grid container">
      { currentUser.employeeCheck || currentUser.ITCheck
        ? null
        : <div>
            <div id="select-user">Please select 'Current User'</div>
            <div className="ui hidden divider"></div>
            <button id='load-csv' className="ui button" type='submit' onClick={ handleClick }>LOAD MOCK ORG CHART DATA</button>
            <div> Mock data can be found <a id="csv-link" href="https://dl.dropboxusercontent.com/u/12239436/mock_org_chart.csv">here.</a></div>
          </div>
      }
    </div>
  )
}

const mapStatetoProps= ({ currentUser }) => ({ currentUser })

const mapDispatchtoProps = dispatch => {
  return {
    handleClick: event => {
      event.preventDefault();
      dispatch(loadCSV());
    }
  }
}


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(Home)
