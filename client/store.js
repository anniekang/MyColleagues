const { createStore, combineReducers, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

const currentView = (state = 'edit-profile', action) => {
  switch(action.type) {
    default:
      return 'edit-profile';
  }
}

const newEmployee = (state = [], action) => {
  switch (action.type) {
    case 'EMPLOYEE_SUBMITTED':
      return Object.assign({}, state, {
        employeeSubmitted: true
      });
    case 'EMPLOYEE_SAVED':
    case 'EMPLOYEE_FAILURE':
    case 'FORM_CLEARED':
      return Object.assign({}, state, {
        employeeSubmitted: false
      });
    default:
      return state;

  }
}

const initialState = {
  currentView: 'edit-profile'
}

const reducer = combineReducers({ currentView, newEmployee });
const store = createStore(reducer, initialState, applyMiddleware(thunk));

module.exports = store;
