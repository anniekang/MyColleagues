const newEmployee = document.getElementById('employee');
newEmployee.addEventListener('submit', createEmployee);

const getEmployee = document.getElementById('find-employee');
getEmployee.addEventListener('submit', viewEmployee);

const editEmployee = document.getElementById('employee-profile');
editEmployee.addEventListener('click', updateEmployee);
editEmployee.addEventListener('click', deleteEmployee);



function hidden(item, change) {
  const check = document.getElementById(item);
  if (change === 'add') {
    check.classList.add('invisible', 'section', 'hidden');
  }
  else {
    check.classList.remove('invisible', 'section', 'hidden');
  }
}


function createElement(tagName,attributes,children) {
  const element = document.createElement(tagName);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child instanceof Element) {
      element.appendChild(child)
    }
    else {
      element.appendChild(document.createTextNode(child))
    }
  }
  return element;
}


function createEmployee(event) {
  event.preventDefault();
  if (newEmployee.classList.contains('edit')) {
    newEmployee.classList.remove('edit');
    submitChanges(event);
    return;
  }
  const employeeData = new FormData(event.target);

  const employee = {
    id: employeeData.get('id'),
    first: employeeData.get('first-name'),
    last: employeeData.get('last-name'),
    photo: employeeData.get('photo'),
    title: employeeData.get('job-title'),
    email: employeeData.get('email'),
    managerId: employeeData.get('manager-id'),
  };
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const request = new Request('/newemployee/');

  fetchData(employee, 'POST', headers, request)
    .then(response => {
      if (response.error) {
        const idExists = response.error;
        alert(idExists);
      }
      else if (response.id) {
        const created = 'Employee ' + response.id + ' ' + response.first + ' ' + response.last + ' has been successfully created.';
        alert(created);
      }
    })
}


function fetchData(data, method, myHeaders, request) {
  var init = { method: method,
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };

  if (method !== 'GET') init.body = JSON.stringify(data);

  return fetch(request, init)
          .then(response => response.json())
}


function viewEmployee(event) {
  event.preventDefault();
  const employeeData = new FormData(event.target);

  const employee = {
    id: employeeData.get('id')
  };

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const request = new Request('/viewemployee/' + employee.id);

  fetchData(employee, 'GET', headers, request)
    .then(response => {
      if (response.error) {
        const idUnsuccessful = response.error;
        alert(idUnsuccessful);
      }
      else if (response.id) {
        const profile = renderProfile(response);
        const employeeProfile = document.getElementById('employee-profile');
        if (employeeProfile.lastChild) employeeProfile.removeChild(employeeProfile.lastChild);
        employeeProfile.appendChild(profile);

        hidden('view-profile', 'remove');

        document.getElementById('find-id').value = '';
      }
    })
}


function renderProfile(response) {
  const c = createElement;
  const profile =
    c('div', {id: 'view-profile', class: 'ui equal width grid container invisible section hidden'}, [
      c('div', {class: 'ui hidden divider'}, []),
      c('div', {class: 'row'}, [
        c('div', {class: 'twelve wide column'}, [
          c('div', {class: 'row'}, [
            c('span', {id: 'profile-first'}, [response.first + ' ']),
            c('span', {id: 'profile-last'}, [response.last])
          ]),
          c('div', {class: 'ui row grid'}, [
            c('div', {class: 'four wide column'}, [
              c('img', {id: 'profile-photo', class: 'ui small image', alt: 'Profile Photo', src: response.photo}, [])
            ]),
            c('div', {class: 'twelve wide column'}, [
              c('div', {class: 'row'}, ['ID: ',
                c('span', {id: 'profile-id'}, [response.id])
              ]),
              c('div', {class: 'row'}, ['Job Title: ',
                c('span', {id: 'profile-title'}, [response.title])
              ]),
              c('div', {class: 'row'}, ['Job Description: ',
                c('span', {id: 'profile-description'}, [response.description])
              ]),
              c('div', {class: 'row'}, ['Email: ',
                c('span', {id: 'profile-email'}, [response.email])
              ]),
              c('div', {class: 'row'}, ['Manager ID: ',
                c('span', {id: 'profile-manager'}, [response.manager_id])
              ]),
              c('div', {class: 'row'}, ['Manager Name: ',
                c('span', {id: 'profile-manager-name'}, [response.manager_first + ' ' + response.manager_last])
              ])
            ])
          ])
        ]),
        c('div', {class: 'four wide column'}, [
          c('div', {class: 'ui one column centered grid'}, [
            c('div', {class: 'row'}, [
              c('button', {id: 'edit-button', class: 'ui button', type: 'submit'}, ['Edit Profile'])
            ]),
            c('div', {class: 'row'}, [
              c('button', {id: 'delete-button', class: 'ui button', type: 'submit'}, ['Delete Profile'])
            ])
          ])
        ])
      ])
    ]);
  return profile;
}


function updateEmployee(event) {
  event.preventDefault();
  if (event.target.id === 'edit-button') {
    const employee = {
      id: document.getElementById('profile-id').textContent
    };

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const request = new Request('/viewemployee/' + employee.id);

    fetchData(employee, 'GET', headers, request)
      .then(response => {
        newEmployee.classList.add('edit');

        document.getElementById('employee-id').value = response.id;
        document.getElementById('employee-first').value = response.first;
        document.getElementById('employee-last').value = response.last;
        document.getElementById('employee-photo').value = response.photo;
        document.getElementById('employee-title').value = response.title;
        document.getElementById('employee-description').value = response.description;
        document.getElementById('employee-email').value = response.email;
        document.getElementById('employee-manager').value = response.manager_id;

        hidden('view-profile', 'add');
        hidden('description', 'remove')
        hidden('edit-profile', 'remove');
      })
  }
}


function submitChanges(event) {
  event.preventDefault();
  const employeeData = new FormData(event.target);
  const employee = {
    id: employeeData.get('id'),
    first: employeeData.get('first-name'),
    last: employeeData.get('last-name'),
    photo: employeeData.get('photo'),
    title: employeeData.get('job-title'),
    description: employeeData.get('job-description'),
    email: employeeData.get('email'),
    managerId: employeeData.get('manager-id'),
  };

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const request = new Request('/updateemployee/');

  fetchData(employee, 'PUT', headers, request)
    .then(response => {
      const profile = renderProfile(response);
      const employeeProfile = document.getElementById('employee-profile');
      employeeProfile.removeChild(employeeProfile.lastChild);
      employeeProfile.appendChild(profile);
      hidden('edit-profile', 'add');
      hidden('view-profile', 'remove');
    })
}

function deleteEmployee(event) {
  event.preventDefault();
  if (event.target.id === 'delete-button') {
    const employee = {
      id: document.getElementById('profile-id').textContent,
      first: document.getElementById('profile-first').textContent,
      last: document.getElementById('profile-last').textContent
    };

    const confirm = window.confirm('Are you sure you would like to delete Employee ' + employee.id + ' ' + employee.first + employee.last + '?');

    if (!confirm) {
      return;
    }

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const request = new Request('/deleteemployee/' + employee.id);

    fetchData(employee, 'DELETE', headers, request)
      .then(response => {
        if (response.error) {
          const idUnsuccessful = response.error;
          alert(idUnsuccessful);
        }
        else if (response.success) {
          const successful = response.success;
          const employeeProfile = document.getElementById('employee-profile');
          employeeProfile.removeChild(employeeProfile.lastChild);
          alert(successful);
        }
      })
  }
}
