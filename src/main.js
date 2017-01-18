const newEmployee = document.getElementById('employee');
const getEmployee = document.getElementById('find-employee');

newEmployee.addEventListener('submit', createEmployee);

getEmployee.addEventListener('submit', viewEmployee);

function createEmployee(event) {
  event.preventDefault();
  const employeeData = new FormData(event.target);

  const newEmployee = {
    id: employeeData.get('id'),
    first: employeeData.get('first-name'),
    last: employeeData.get('last-name'),
    photo: employeeData.get('photo'),
    title: employeeData.get('job-title'),
    email: employeeData.get('email'),
    manager: employeeData.get('manager-id'),
  };

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const request = new Request('/newemployee/');

  fetchData(newEmployee, 'POST', headers, request)
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
        employeeProfile.appendChild(profile);


        let viewProfile = document.getElementById('view-profile');
        viewProfile.classList.remove('invisible', 'section', 'hidden');
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
        c('span', {id: 'profile-first'}, [response.first]),
        c('span', {id: 'profile-last'}, [response.last])
      ]),
      c('div', {class: 'row'}, [
        c('div', {class: 'four wide column'}, [
          c('img', {id: 'profile-photo', class: 'ui small image', alt: 'Profile Photo', src: response.photo}, [])
        ]),
        c('div', {class: 'twelve wide column'}, [
          c('div', {class: 'row'}, ['ID:',
            c('span', {id: 'profile-id'}, [response.id])
          ]),
          c('div', {class: 'row'}, ['Job Title:',
            c('span', {id: 'profile-title'}, [response.title])
          ]),
          c('div', {class: 'row'}, ['Email:',
            c('span', {id: 'profile-email'}, [response.email])
          ]),
          c('div', {class: 'row'}, ['Manager ID:',
            c('span', {id: 'profile-manager'}, [response.manager_id])
          ]),
          c('div', {class: 'row'}, ['Manager Name:',
            c('span', {id: 'profile-manager-name'}, [response.manager_first + ' ' + response.manager_last])
          ])
        ])
      ])
    ]);
  return profile;
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
