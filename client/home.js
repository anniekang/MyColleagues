const React = require('react');
const { connect } = require('react-redux');

const Home = ({ currentUser }) => {
  return (
    <div>
    
    </div>
  )
}

const mapStatetoProps = ({ currentUser }) => ({ currentUser })

module.exports = connect(mapStatetoProps)(Home)
