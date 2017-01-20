const newEmployee = document.getElementById('employee');
newEmployee.addEventListener('submit', createEmployee);

const getEmployee = document.getElementById('find-employee');
getEmployee.addEventListener('submit', viewEmployee);

const editEmployee = document.getElementById('employee-profile');
editEmployee.addEventListener('click', updateEmployee);
editEmployee.addEventListener('click', deleteEmployee);
editEmployee.addEventListener('click', viewOrg);

const org = document.getElementById('org-chart');
org.addEventListener('click', viewOrg);


function hidden(item, change) {
  const check = document.getElementById(item);
  if (change === 'add') {
    check.classList.add('invisible', 'section', 'hidden');
  }
  else {
    check.classList.remove('invisible', 'section', 'hidden');
  }
}


function fetchData(data, method, request) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  var init = { method: method,
                 headers: headers,
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

  const request = new Request('/newemployee/');

  fetchData(employee, 'POST', request)
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

  const request = new Request('/viewemployee/' + employee.id);

  fetchData('', 'GET', request)
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
        hidden('edit-profile', 'add');
        hidden('org-chart', 'add');

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
              c('button', {class: 'ui button org-button', type: 'submit'}, ['Org Chart'])
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

    const request = new Request('/viewemployee/' + employee.id);

    fetchData('', 'GET', request)
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

  for (let key in employee) {
    employee[key] = employee[key].trim();
  }

  const request = new Request('/updateemployee/');

  fetchData(employee, 'PUT', request)
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

    const request = new Request('/deleteemployee/' + employee.id);

    fetchData(employee, 'DELETE', request)
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

function viewOrg(event) {
  event.preventDefault();
  if (event.target.classList.contains('org-button') || event.target.classList.contains('manager-button') || event.target.classList.contains('employee-button') || event.target.classList.contains('report-button')) {
    let managerId = '';
    let employeeId = '';
    if (event.target.classList.contains('org-button')) {
      managerId = document.getElementById('profile-manager').textContent;
      employeeId = document.getElementById('profile-id').textContent;
    }
    else {
      managerId = event.target.classList[4];
      employeeId = event.target.classList[3];
    }

    const requestMgr = new Request('/orgchartmanager/' + managerId);
    const requestEmp = new Request('/orgchartemployee/' + employeeId);
    const requestPeers = new Request('/orgchartpeers/' + employeeId + '/' + managerId);
    const requestReports = new Request('/orgchartreports/' + employeeId);

    fetchData('', 'GET', requestMgr)
      .then(response => {
        const manager = renderManager(response);
        const orgChart = document.getElementById('org-chart');
        if (orgChart.lastChild) orgChart.removeChild(orgChart.lastChild);
        orgChart.appendChild(manager);

        hidden('view-profile', 'add');
        hidden('org-chart', 'remove')
      })
      .then ( () => {
        fetchData('', 'GET', requestEmp)
          .then(response => {
            console.log(response);
            const employee = renderEmployees(response);
            const manager = document.getElementById('org-manager');
            manager.appendChild(employee);
          })
          .then ( () => {
            fetchData('', 'GET', requestPeers)
              .then(response => {
                console.log(response);
                const managerOrg = document.getElementById('org-manager');

                console.log(response.length);
                response.forEach( (peer) => {
                  let addPeer = renderEmployees(peer);
                  managerOrg.appendChild(addPeer);
                })
              })
              .then ( () => {
                fetchData('', 'GET', requestReports)
                  .then(response => {
                    const employeeOrg = document.getElementById(employeeId);
                    console.log(response.length);
                    response.forEach( (report) => {
                      let addReport = renderReports(report);
                      employeeOrg.appendChild(addReport);
                    })
                  })
              })
          })
      })


  }
}


function renderManager(response) {
  const c = createElement;
  const manager =
    c('div', {id: 'org-manager', class: 'ui equal width grid container'}, [
      c('div', {class: 'ui hidden divider'}, []),
      c('div', {class: 'row'}, [
        c('div', {class: 'ten wide column'}, [
          c('div', {class: 'ui row grid'}, [
            c('div', {class: 'four wide column'}, [
              c('img', {id: 'manager-photo', class: 'ui small image', alt: 'Profile Photo', src: response.photo}, [])
            ]),
            c('div', {class: 'twelve wide column'}, [
              c('div', {class: 'row'}, ['Name: ',
                c('span', {id: 'manager-first'}, [response.first + ' ']),
                c('span', {id: 'manager-last'}, [response.last])
              ]),
              c('div', {class: 'row'}, ['ID: ',
                c('span', {id: 'org-manager-id'}, [response.id])
              ]),
              c('div', {class: 'row'}, ['Job Title: ',
                c('span', {id: 'manager-title'}, [response.title])
              ]),
              c('div', {class: 'row'}, ['Email: ',
                c('span', {id: 'manager-email'}, [response.email])
              ])
            ])
          ])
        ]),
        c('div', {class: 'four wide column'}, [
          c('div', {class: 'ui one column centered grid'}, [
            c('div', {class: 'row'}, [
              c('button', {class: 'ui button manager-button '  + response.id + ' ' + response.manager_id, type: 'submit'}, ['Org Chart'])
            ])
          ])
        ])
      ])
    ]);
  return manager;
}

function renderEmployees(response) {
  const c = createElement;
  const employee =
    c('div', {id: response.id, class: 'ui equal width grid container employee'}, [
      c('div', {class: 'ui hidden divider'}, []),
      c('div', {class: 'row'}, [
        c('div', {class: 'one wide column'}, []),
        c('div', {class: 'ten wide column'}, [
          c('div', {class: 'ui row grid'}, [
            c('div', {class: 'four wide column'}, [
              c('img', {class: 'ui small image employee-photo', alt: 'Profile Photo', src: response.photo}, [])
            ]),
            c('div', {class: 'twelve wide column'}, [
              c('div', {class: 'row'}, ['Name: ',
                c('span', {class: 'employee-first'}, [response.first + ' ']),
                c('span', {class: 'employee-last'}, [response.last])
              ]),
              c('div', {class: 'row'}, ['ID: ',
                c('span', {class: 'employee-id'}, [response.id])
              ]),
              c('div', {class: 'row'}, ['Job Title: ',
                c('span', {class: 'employee-title'}, [response.title])
              ]),
              c('div', {class: 'row'}, ['Email: ',
                c('span', {class: 'employee-email'}, [response.email])
              ])
            ])
          ])
        ]),
        c('div', {class: 'four wide column'}, [
          c('div', {class: 'ui one column centered grid'}, [
            c('div', {class: 'row'}, [
              c('button', {class: 'ui button employee-button ' + response.id + ' ' + response.manager_id, type: 'submit'}, ['Org Chart'])
            ])
          ])
        ])
      ])
    ]);
  return employee;
}

function renderReports(response) {
  const c = createElement;
  const report =
    c('div', {class: 'ui equal width grid container employee'}, [
      c('div', {class: 'ui hidden divider'}, []),
      c('div', {class: 'row'}, [
        c('div', {class: 'two wide column'}, []),
        c('div', {class: 'ten wide column'}, [
          c('div', {class: 'ui row grid'}, [
            c('div', {class: 'four wide column'}, [
              c('img', {class: 'ui small image report-photo', alt: 'Profile Photo', src: response.photo}, [])
            ]),
            c('div', {class: 'twelve wide column'}, [
              c('div', {class: 'row'}, ['Name: ',
                c('span', {class: 'report-first'}, [response.first + ' ']),
                c('span', {class: 'report-last'}, [response.last])
              ]),
              c('div', {class: 'row'}, ['ID: ',
                c('span', {class: 'report-id'}, [response.id])
              ]),
              c('div', {class: 'row'}, ['Job Title: ',
                c('span', {class: 'report-title'}, [response.title])
              ]),
              c('div', {class: 'row'}, ['Email: ',
                c('span', {class: 'report-email'}, [response.email])
              ])
            ])
          ])
        ]),
        c('div', {class: 'four wide column'}, [
          c('div', {class: 'ui one column centered grid'}, [
            c('div', {class: 'row'}, [
              c('button', {class: 'ui button report-button ' + response.id + ' ' + response.manager_id, type: 'submit'}, ['Org Chart'])
            ])
          ])
        ])
      ])
    ]);
  return report;
}
