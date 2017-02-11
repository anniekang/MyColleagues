const { createStore, combineReducers, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

const currentView = (state = [], action) => {
  switch(action.type) {
    case 'SEARCH_SUBMITTED':
      return 'org-search-employee';
    case 'EMPLOYEE_SAVED':
    case 'ID_FOUND':
    case 'EDIT_SAVED':
      return 'profile';
    case 'EDIT_FORM':
    case 'EMPLOYEE_DELETED':
      return 'edit-profile';
    case 'RENDER_MANAGER':
      return 'org-chart';
    default:
      return state;
  }
};

const searchResults = (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_SUBMITTED':
      return Object.assign({}, state, {
        search_submitted: true,
        search: action.search
      });
    case 'RENDER_RESULTS':
      return Object.assign({}, state, {
        results: action.results
      });
    case 'SEARCH_CLEARED':
      return Object.assign({}, state, {
        search_submitted: false,
      });
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
};

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
};

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
};

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
};

const deleteEmployee = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_EMPLOYEE':
      return Object.assign({}, state, {
        deleteSubmitted: true
      });
    case 'DELETE_CONFIRMED':
      return Object.assign({}, state, {
        deleteConfirmed: true
      });
    case 'DELETE_ERROR':
    case 'EMPLOYEE_DELETED':
      return Object.assign({}, state, {
        deleteSubmitted: false,
        deleteConfirmed: false
      });
    default:
      return state;
  }
};

const viewOrg = (state = [], action) => {
  switch (action.type) {
    case 'ORG_SUBMITTED':
      return Object.assign({}, state, {
        orgSubmitted: true
      });
    case 'RENDER_MANAGER':
      return Object.assign({}, state, {
        orgSubmitted: false,
        employeeType: 'org-manager',
        manager: action.response
      });
    case 'RENDER_EMPLOYEE':
      return Object.assign({}, state, {
        employee: action.response
      });
    case 'RENDER_PEERS':
      return Object.assign({}, state, {
        peers: action.response
      });
    case 'RENDER_REPORTS':
      return Object.assign({}, state, {
        reports: action.response
      });
    default:
      return state;
  }
}

const initialState = {
  currentView: 'edit-profile',
  searchResults: {
    searchSubmitted: false,
    search: '',
    results: []
  },
  newEmployee: {
    employeeSubmitted: false
  },
  editEmployee: {
    editReady: false
  },
  editSubmission: {
    editSubmitted: false
  },
  deleteEmployee: {
    deleteSubmitted: false,
    deleteConfirmed: false
  },
  viewOrg: {
    orgSubmitted: false,
    employeeType: '',
    manager: [],
    employee: {},
    peers: [],
    reports: []
  }
};

const reducer = combineReducers({ currentView, searchResults, newEmployee, viewEmployee, editEmployee, editSubmission, deleteEmployee, viewOrg });
const store = createStore(reducer, initialState, applyMiddleware(thunk));

module.exports = store;
