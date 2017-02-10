const { createStore, combineReducers, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

const currentView = (state = [], action) => {
  switch(action.type) {
    case 'EMPLOYEE_SAVED':
    case 'ID_FOUND':
    case 'EDIT_SAVED':
      return 'profile';
    case 'EDIT_FORM':
      return 'edit-profile';
    default:
      return state;
  }
}

const newEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'EMPLOYEE_SUBMITTED':
      return Object.assign({}, state, {
        employee_submitted: true
      });
    case 'EMPLOYEE_SAVED':
    case 'EMPLOYEE_FAILURE':
    case 'FORM_CLEARED':
      return Object.assign({}, state, {
        employee_submitted: false
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
    case 'EMPLOYEE_SAVED':
    case 'ID_FOUND':
    case 'EDIT_SAVED':
      return action.response;
    default:
      return state;
  }
}

const editEmployee = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_FORM':
      return action.response;
    case 'READY_TO_EDIT':
      return Object.assign({}, state, {
        editReady: true
      });
    case 'EDIT_SAVED':
    return Object.assign({}, state, {
      editReady: false
    });
    default:
      return state;
  }
}

const editSubmission = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_SUBMITTED':
      return Object.assign({}, state, {
        editSubmitted: true
      });
    case 'EDIT_SAVED':
      return Object.assign({}, state, {
        editSubmitted: false
      });
    default:
      return state;
  }
}

const initialState = {
  newEmployee: {
    employeeSubmitted: false
  },
  currentView: 'edit-profile',
  editEmployee: {
    editReady: false
  },
  editSubmissions: {
    editSubmitted: false
  }
}

const reducer = combineReducers({ currentView, newEmployee, viewEmployee, editEmployee, editSubmission });
const store = createStore(reducer, initialState, applyMiddleware(thunk));

module.exports = store;
