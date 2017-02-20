const { createStore, combineReducers, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');


const currentView = (state = [], action) => {
  switch(action.type) {
    case 'CHANGE_USER':
    case 'IT_CHECKED':
    case 'EMPLOYEE_CHECKED':
    case 'EMPLOYEE_NOT_FOUND':
    case 'DELETE_EMPLOYEE_CONFIRMED':
    case 'EMPLOYEE_DELETED':
    case 'IT_SELECTED':
    case 'CHANGE_LOGO':
      return 'home';
    case 'RENDER_RESULTS':
      return 'org-search-employee';
    case 'EMPLOYEE_SAVED':
    case 'EMPLOYEE_FOUND':
    case 'ID_FOUND':
    case 'EDIT_SAVED':
    case 'DELETE_EMPLOYEE_ERROR':
      return 'profile';
    case 'CREATE_PROFILE_SUBMITTED':
    case 'EDIT_FORM':
    case 'MISSING_FIELDS_NEW':
    case 'MISSING_FIELDS_EDIT':
      return 'edit-profile';
    case 'RENDER_PEERS':
      return 'org-chart';
    default:
      return state;
  }
};

const CSV = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_CSV':
      return true;
    default:
      return state;
  }
}

const currentUser = (state = {}, action) => {
  switch(action.type) {
    case 'IT_CHECKED':
      return Object.assign({}, state, {
        ITCheck: true,
        ITSelect: false,
        employeeCheck: false,
        employeeSelect: false,
        employeeFound: false,
        employeeError: false
      });
    case 'IT_SELECTED':
      return Object.assign({}, state, {
        ITSelect: true,
        ITError: false
      });
    case 'IT_ERROR':
      return Object.assign({}, state, {
        ITSelect: false,
        ITError: true
      });
    case 'IT_CONFIRMED':
      return Object.assign({}, state, {
        ITConfirmed: true,
        employeeId: '',
        employee: {}
      });
    case 'EMPLOYEE_CHECKED':
      return Object.assign({}, state, {
        ITCheck: false,
        ITSelect: false,
        ITConfirmed: false,
        employeeCheck: true,
        ITError: false
      });
    case 'EMPLOYEE_SELECTED':
      return Object.assign({}, state, {
        employeeSelect: true,
        employeeId: action.employeeId,
        employeeError: false
      });
    case 'EMPLOYEE_NOT_FOUND':
      return Object.assign({}, state, {
        employeeSelect: false,
        employeeError: true
      });
    case 'EMPLOYEE_FOUND':
      return Object.assign({}, state, {
        employeeFound: true,
        employee: action.response
      });
    case 'CHANGE_USER':
      return Object.assign({}, state, {
        ITCheck: false,
        ITSelect: false,
        ITConfirmed: false,
        employeeCheck: false,
        employeeSelect: false,
        employeeFound: false,
        employeeId: '',
        employee: {},
        changeLogo: false
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
    case 'CHANGE_USER':
      return Object.assign({}, state, {
        results: [],
        employeeType: '',
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
    case 'CHANGE_USER':
      return Object.assign({}, state, {
        idSubmitted: false,
        employee: ''
      });
    default:
      return state;
  }
};

const newEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_PROFILE_SUBMITTED':
      return Object.assign({}, state, {
        newProfile: true,
        missingFields: [],
        photoError: false,
        errorCode: '',
        errorDescription: '',
        saved: false
      });
    case 'EMPLOYEE_SUBMITTED':
      return Object.assign({}, state, {
        employeeSubmitted: true,
        missingFields: [],
        photoError: false,
        errorCode: '',
        errorDescription: ''
      });
    case 'MISSING_FIELDS_NEW':
      return Object.assign({}, state, {
        missingFields: action.missing,
        photoError: action.photoError,
        employeeSubmitted: false
      });
    case 'EMPLOYEE_FAILURE':
      return Object.assign({}, state, {
        employeeSubmitted: false,
        errorCode: action.errorCode,
        errorDescription: action.errorDescription
      });
    case 'EMPLOYEE_SAVED':
      return Object.assign({}, state, {
        employeeSubmitted: false,
        newProfile: false,
        saved: true
      });
    case 'CHANGE_LOGO':
    case 'CHANGE_USER':
    case 'SEARCH_SUBMITTED':
    case 'EDIT_REQUESTED':
    case 'EDIT_SUBMITTED':
    case 'DELETE_EMPLOYEE_SUBMITTED':
    case 'ORG_SUBMITTED':
      return Object.assign({}, state, {
        saved: false,
        errorCode: '',
        errorDescription: '',
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
        editRequested: true,
        editReady: false,
        editSubmitted: false,
        employee: {},
        missingFields: [],
        photoError: false,
        errorDescription: '',
        saved: false
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
        photoError: false,
        errorDescription: ''
      });
    case 'MISSING_FIELDS_EDIT':
      return Object.assign({}, state, {
        missingFields: action.missing,
        photoError: action.photoError,
        editSubmitted: false
      });
    case 'EDIT_FAILURE':
      return Object.assign({}, state, {
        editSubmitted: false,
        errorDescription: action.errorDescription
      });
    case 'EDIT_SAVED':
      return Object.assign({}, state, {
        editReady: false,
        missingFields: [],
        photoError: false,
        saved: true
      });
    case 'CHANGE_LOGO':
    case 'CHANGE_USER':
    case 'CREATE_PROFILE_SUBMITTED':
    case 'SEARCH_SUBMITTED':
    case 'DELETE_EMPLOYEE_SUBMITTED':
    case 'ORG_SUBMITTED':
      return Object.assign({}, state, {
        editReady: false,
        saved: false,
        employee: {}
      });
    default:
      return state;
  }
};


const deleteEmployee = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_EMPLOYEE_SUBMITTED':
      return Object.assign({}, state, {
        deleteSubmitted: true,
        employeeId: action.employeeId,
        error: false,
        deleted: false
      });
    case 'DELETE_EMPLOYEE_NOT':
      return Object.assign({}, state, {
        deleteSubmitted: false,
        employeeId: ''
      });
    case 'DELETE_EMPLOYEE_CONFIRMED':
      return Object.assign({}, state, {
        deleteConfirmed: true,
        deleteSubmitted: false
      });
    case 'DELETE_EMPLOYEE_ERROR':
    return Object.assign({}, state, {
        deleteConfirmed: false,
        deleteSubmitted: false,
        error: true
      });
    case 'EMPLOYEE_DELETED':
      return Object.assign({}, state, {
        deleteSubmitted: false,
        deleteConfirmed: false,
        deleted: true
      });
    case 'CHANGE_USER':
    case 'SEARCH_SUBMITTED':
    case 'CREATE_PROFILE_SUBMITTED':
    case 'CHANGE_LOGO':
    case 'EDIT_REQUESTED':
    case 'ORG_SUBMITTED':
      return Object.assign({}, state, {
        error: false,
        deleted: false,
        employeeId: ''
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
    case 'CHANGE_USER':
      return Object.assign({}, state, {
        orgSubmitted: false,
        employeeType: '',
        manager: {},
        employee: [],
        peers: [],
        reports: []
      });
      default:
      return state;
  }
}

const initialState = {
  currentView: 'home',
  currentUser: {
    ITCheck: false,
    ITSelect: false,
    ITError: false,
    ITConfirmed: false,
    employeeCheck: false,
    employeeSelect: false,
    employeeError: false,
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
    errorCode: '',
    errorDescription: '',
    employeeSubmitted: false,
    saved: false
  },
  editEmployee: {
    editRequested: false,
    editReady: false,
    editSubmitted: false,
    employee: {},
    missingFields: [],
    photoError: false,
    errorDescription: '',
    saved: false
  },
  deleteEmployee: {
    deleteSubmitted: false,
    employeeId: '',
    deleteConfirmed: false,
    error: false,
    deleted: false
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


const reducer = combineReducers({ currentView, CSV, currentUser, searchResults, viewEmployee, newEmployee, editEmployee, deleteEmployee, viewOrg });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));


module.exports = store;
