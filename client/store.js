const { createStore, combineReducers, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

const currentView = (state = [], action) => {
  switch(action.type) {
    case 'EMPLOYEE_DELETED':
    case 'IT_SELECTED':
      return 'home';
    case 'RENDER_RESULTS':
      return 'org-search-employee';
    case 'EMPLOYEE_SAVED':
    case 'ID_FOUND':
    case 'EDIT_SAVED':
      return 'profile';
    case 'CREATE_PROFILE_SUBMITTED':
    case 'EDIT_FORM':
    case 'MISSING_FIELDS':
      return 'edit-profile';
    case 'RENDER_PEERS':
      return 'org-chart';
    default:
      return state;
  }
};


const currentUser = (state = {}, action) => {
  switch(action.type) {
    case 'IT_SELECTED':
      return Object.assign({}, state, {
        IT: true
      });
    case 'ID_SEARCH':
    return Object.assign({}, state, {
      IT: false
    });
    default:
      return state;
  }
}


const searchResults = (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_SUBMITTED':
      return Object.assign({}, state, {
        searchSubmitted: true,
        search: action.search
      });
    case 'RENDER_RESULTS':
      return Object.assign({}, state, {
        results: action.results,
        employeeType: 'search-result',
        searchSubmitted: false
      });
    default:
      return state;
  }
};


const viewEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'ID_SEARCH':
      return Object.assign({}, state, {
        idSubmitted: true,
        employeeId: action.employeeId
      });
    case 'ID_NOT_FOUND':
      return Object.assign({}, state, {
        idSubmitted: false
      });
    case 'ID_FOUND':
    case 'EMPLOYEE_SAVED':
    case 'EDIT_SAVED':
      return Object.assign({}, state, {
        idSubmitted: false,
        employee: action.response
      });
    default:
      return state;
  }
};

const newEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_PROFILE_SUBMITTED':
      return Object.assign({}, state, {
        newProfile: true
      });
    case 'EMPLOYEE_SUBMITTED':
      return Object.assign({}, state, {
        employeeSubmitted: true
      });
    case 'MISSING_FIELDS':
      return Object.assign({}, state, {
        fixMissing: true,
        missingFields: action.missing,
        employeeSubmitted: false
      });
    case 'EMPLOYEE_FAILURE':
      return Object.assign({}, state, {
        employeeSubmitted: false,
      });
    case 'EMPLOYEE_SAVED':
      return Object.assign({}, state, {
        employeeSubmitted: false,
        newProfile: false
      });
    default:
      return state;
  }
};


const editEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_REQUESTED':
      return Object.assign({}, state, {
        editRequested: true
      });
    case 'EDIT_FORM':
      return Object.assign({}, state, {
        editReady: true,
        employee: action.response
      });
    case 'EDIT_SUBMITTED':
      return Object.assign({}, state, {
        editSubmitted: true
      });
    case 'EDIT_SAVED':
      return Object.assign({}, state, {
        editReady: false,
        editSubmitted: false,
        employee: {}
      });
    default:
      return state;
  }
};


const deleteEmployee = (state = {}, action) => {
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
    case 'ORG_DATA_RECEIVED':
      return Object.assign({}, state, {
        orgSubmitted: false
      });
    case 'RENDER_MANAGER':
      return Object.assign({}, state, {
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
  currentView: 'home',
  currentUser: {
    IT: false
  },
  searchResults: {
    searchSubmitted: false,
    search: '',
    employeeType: '',
    results: []
  },
  viewEmployee: {
    idSubmitted: false,
    employeeId: '',
    employee: {}
  },
  newEmployee: {
    newProfile: false,
    fixMissing: false,
    missingFields: [],
    employeeSubmitted: false
  },
  editEmployee: {
    editRequested: true,
    editReady: false,
    editSubmitted: false,
    employee: {}
  },
  deleteEmployee: {
    deleteSubmitted: false,
    deleteConfirmed: false
  },
  viewOrg: {
    orgSubmitted: false,
    employeeType: '',
    manager: {},
    employee: [],
    peers: [],
    reports: []
  }
};

const reducer = combineReducers({ currentView, currentUser, searchResults, viewEmployee, newEmployee, editEmployee, deleteEmployee, viewOrg });
const store = createStore(reducer, initialState, applyMiddleware(thunk));

module.exports = store;
