const { createStore, combineReducers, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

const currentView = (state = [], action) => {
  switch(action.type) {
    case 'ID_FOUND':
      return 'profile';
    default:
      return state;
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

const viewEmployee = (state = [], action) => {
  switch (action.type) {
    case 'ID_SEARCH':
    case 'ID_NOT_FOUND':
    case 'ID_CLEARED':
      return state;
    case 'ID_FOUND':
      return action.response;
    default:
      return state;
  }

}

const initialState = {
  currentView: 'edit-profile'
}

const reducer = combineReducers({ currentView, newEmployee, viewEmployee });
const store = createStore(reducer, initialState, applyMiddleware(thunk));

module.exports = store;
