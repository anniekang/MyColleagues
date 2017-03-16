/* global compose */

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
    case 'RENDER_EMPLOYEE_RESULTS':
      return 'org-search-employee';
    case 'EMPLOYEE_SAVED':
    case 'EMPLOYEE_FOUND':
    case 'ID_FOUND':
    case 'EDIT_SAVED':
    case 'DELETE_EMPLOYEE_ERROR':
    case 'COLLAB_SAVED':
    case 'RENDER_COLLABS':
    case 'EDIT_COLLAB_SAVED':
      return 'profile';
    case 'CREATE_PROFILE_SUBMITTED':
    case 'EDIT_FORM':
      return 'edit-profile';
    case 'RENDER_PEERS':
      return 'org-chart';
    case 'CREATE_COLLAB_SUBMITTED':
    case 'EDIT_COLLAB_FORM':

      return 'edit-collab';
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
    case 'RENDER_COLLABS':
      return Object.assign({}, state, {
        collabs: action.response
      });
    case 'CHANGE_USER':
      return Object.assign({}, state, {
        idSubmitted: false,
        employee: {},
        collabs: []
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


const searchType = (state = {}, action) => {
  switch(action.type) {
    case 'EMPLOYEE_SEARCH':
      return Object.assign({}, state, {
        isEmployee: true
      });
    case 'COLLABORATION_SEARCH':
      return Object.assign({}, state, {
        isEmployee: false
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
        isEmployee: action.isEmployee,
        search: action.search
      });
    case 'RENDER_EMPLOYEE_RESULTS':
      return Object.assign({}, state, {
        results: action.results,
        employeeType: 'search-result',
        searchSubmitted: false
      });
    case 'RENDER_COLLABORATION_RESULTS':
      return Object.assign({}, state, {
        results: action.results,
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


const newCollab = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_COLLAB_SUBMITTED':
      return Object.assign({}, state, {
        newCollab: true,
        employeeId: action.employeeId,
        missingFields: [],
        errorCode: '',
        errorDescription: '',
        saved: false
      });
    case 'COLLAB_SUBMITTED':
      return Object.assign({}, state, {
        collabSubmitted: true,
        collaboration: action.collaboration,
        missingFields: [],
        errorDescription: ''
      });

    case 'MISSING_FIELDS_NEW_COLLAB':
      return Object.assign({}, state, {
        missingFields: action.missing,
        collabSubmitted: false
      });

    case 'COLLAB_FAILURE':
      return Object.assign({}, state, {
        collabSubmitted: false,
        errorCode: action.errorCode,
        errorDescription: action.errorDescription
      });
    case 'COLLAB_SAVED':
      return Object.assign({}, state, {
        collabSubmitted: false,
        newCollab: false,
        saved: true,
        collaboration: action.response
      });
    case 'CHANGE_LOGO':
    case 'CHANGE_USER':
    case 'SEARCH_SUBMITTED':
    case 'CREATE_PROFILE_SUBMITTED':
    case 'EDIT_REQUESTED':
    case 'DELETE_EMPLOYEE_SUBMITTED':
    case 'ORG_SUBMITTED':
    case 'EDIT_COLLAB_REQUESTED':
      return Object.assign({}, state, {
        collaboration: {},
        employeeId: '',
        saved: false,
        errorCode: '',
        errorDescription: '',
        newCollab: false
      });
    default:
      return state;
  }
};


const editCollab = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_COLLAB_REQUESTED':
      return Object.assign({}, state, {
        editRequested: true,
        editReady: false,
        editSubmitted: false,
        collaboration: {},
        missingFields: [],
        errorDescription: '',
        saved: false
      });
    case 'EDIT_COLLAB_FORM':
      return Object.assign({}, state, {
        editReady: true,
        editRequested: false,
        collaboration: action.response
      });

    case 'EDIT_COLLAB_SUBMITTED':
      return Object.assign({}, state, {
        editSubmitted: true,
        missingFields: [],
        errorDescription: ''
      });
    case 'MISSING_FIELDS_EDIT_COLLAB':
      return Object.assign({}, state, {
        missingFields: action.missing,
        editSubmitted: false
      });
    case 'EDIT_COLLAB_FAILURE':
      return Object.assign({}, state, {
        editSubmitted: false,
        errorDescription: action.errorDescription
      });
    case 'EDIT_COLLAB_SAVED':
      return Object.assign({}, state, {
        editReady: false,
        missingFields: [],
        saved: true,
        collaboration: action.response
      });
    case 'CHANGE_LOGO':
    case 'CHANGE_USER':
    case 'CREATE_PROFILE_SUBMITTED':
    case 'EDIT_REQUESTED':
    case 'SEARCH_SUBMITTED':
    case 'DELETE_EMPLOYEE_SUBMITTED':
    case 'ORG_SUBMITTED':
      return Object.assign({}, state, {
        editReady: false,
        saved: false,
        collaboration: {},
        missingFields: []
      });
    default:
      return state;
  }
};

const deleteCollab = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_COLLAB_SUBMITTED':
      return Object.assign({}, state, {
        deleteSubmitted: true,
        collabId: action.collabId,
        error: false,
        deleted: false
      });
    case 'DELETE_COLLAB_NOT':
      return Object.assign({}, state, {
        deleteSubmitted: false,
        collabId: ''
      });
    case 'DELETE_COLLAB_CONFIRMED':
      return Object.assign({}, state, {
        deleteConfirmed: true,
        deleteSubmitted: false
      });
    case 'DELETE_COLLAB_ERROR':
    return Object.assign({}, state, {
        deleteConfirmed: false,
        deleteSubmitted: false,
        error: true
      });
    case 'COLLAB_DELETED':
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
  newEmployee: {
    newProfile: false,
    missingFields: [],
    photoError: false,
    errorCode: '',
    errorDescription: '',
    employeeSubmitted: false,
    saved: false
  },
  viewEmployee: {
    idSubmitted: false,
    employeeId: '',
    employee: {},
    collabs: []
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
  searchType: {
    isEmployee: true
  },
  searchResults: {
    searchSubmitted: false,
    isEmployee: true,
    search: '',
    employeeType: '',
    results: []
  },
  viewOrg: {
    orgSubmitted: false,
    employeeType: '',
    manager: {},
    employee: [],
    peers: [],
    reports: []
  },
  newCollab: {
    newCollab: false,
    employeeId: '',
    collaboration: {},
    missingFields: [],
    errorCode: '',
    errorDescription: '',
    collabSubmitted: false,
    saved: false
  },
  editCollab: {
    editRequested: false,
    editReady: false,
    editSubmitted: false,
    collaboration: {},
    missingFields: [],
    errorDescription: '',
    saved: false
  },
  deleteCollab: {
    deleteSubmitted: false,
    collabId: '',
    deleteConfirmed: false,
    error: false,
    deleted: false
  }
};


const reducer = combineReducers({ currentView, CSV, currentUser, newEmployee, viewEmployee, editEmployee, deleteEmployee, searchType, searchResults, viewOrg, newCollab, editCollab, deleteCollab });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
//const store = createStore(reducer, initialState, applyMiddleware(thunk));


module.exports = store;
