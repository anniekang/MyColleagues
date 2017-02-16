const { createStore, combineReducers, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

const currentView = (state = [], action) => {
  switch(action.type) {
    case 'IT_SELECTED':
    case 'EMPLOYEE_NOT_FOUND':
    case 'EMPLOYEE_DELETED':
      return 'home';
    case 'RENDER_RESULTS':
      return 'org-search-employee';
    case 'EMPLOYEE_SAVED':
    case 'EMPLOYEE_FOUND':
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
        IT: true,
        employeeCheck: false,
        employeeSelect: false
      });
    case 'EMPLOYEE_CHECKED':
      return Object.assign({}, state, {
        IT: false,
        employeeCheck: true
      });
    case 'EMPLOYEE_SELECTED':
      return Object.assign({}, state, {
        IT: false,
        employeeSelect: true,
        employeeId: action.employeeId
      });
    case 'EMPLOYEE_NOT_FOUND':
      return Object.assign({}, state, {
        employeeCheck: true,
        employeeSelect: false
      });
    case 'EMPLOYEE_FOUND':
      return Object.assign({}, state, {
        employeeCheck: true,
        employeeSelect: true,
        employeeFound: true,
        employee: action.response
      });
    case 'CHANGE_LOGO':
      return Object.assign({}, state, {
        changeLogo: true
      });
    case 'CREATE_PROFILE_SUBMITTED':
    case 'SEARCH_SUBMITTED':
      return Object.assign({}, state, {
        changeLogo: false
      });
    case 'SAVE_LOGO':
      return Object.assign({}, state, {
        logo: action.logo,
        changeLogo: false
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
    case 'EMPLOYEE_SELECTED':
    case 'ID_SEARCH':
      return Object.assign({}, state, {
        idSubmitted: true,
        employeeId: action.employeeId
      });
    case 'EMPLOYEE_NOT_FOUND':
    case 'ID_NOT_FOUND':
      return Object.assign({}, state, {
        idSubmitted: false
      });
    case 'EMPLOYEE_FOUND':
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
        employeeSubmitted: true,
        missingFields: [],
        photoError: false,
      });
    case 'MISSING_FIELDS':
      return Object.assign({}, state, {
        missingFields: action.missing,
        photoError: action.photoError,
        employeeSubmitted: false
      });
    case 'EMPLOYEE_FAILURE':
      return Object.assign({}, state, {
        employeeSubmitted: false,
      });
    case 'EMPLOYEE_SAVED':
      return Object.assign({}, state, {
        employeeSubmitted: false,
        newProfile: false,
        missingFields: [],
        photoError: false
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
        editRequested: false,
        employee: action.response
      });
    case 'EDIT_SUBMITTED':
      return Object.assign({}, state, {
        editSubmitted: true,
        missingFields: [],
        photoError: false
      });
    case 'MISSING_FIELDS_EDIT':
      return Object.assign({}, state, {
        missingFields: action.missing,
        photoError: action.photoError,
      });
    case 'EDIT_SAVED':
      return Object.assign({}, state, {
        editReady: false,
        editSubmitted: false,
        employee: {},
        missingFields: [],
        photoError: false
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
    IT: false,
    employeeCheck: false,
    employeeSelect: false,
    employeeFound: false,
    employeeId: '',
    employee: {},
    logo: '',
    changeLogo: false
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
    missingFields: [],
    photoError: false,
    employeeSubmitted: false
  },
  editEmployee: {
    editRequested: true,
    editReady: false,
    editSubmitted: false,
    employee: {},
    missingFields: [],
    photoError: false
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
const store = createStore(reducer, initialState, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = store;
