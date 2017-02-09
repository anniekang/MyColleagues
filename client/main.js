const newEmployee = document.getElementById('employee');
newEmployee.addEventListener('submit', createEmployee);

const getEmployee = document.getElementById('find');
getEmployee.addEventListener('submit', viewEmployee);

const editEmployee = document.getElementById('employee-profile');
editEmployee.addEventListener('click', updateEmployee);
editEmployee.addEventListener('click', deleteEmployee);
editEmployee.addEventListener('click', viewOrg);

const org = document.getElementById('org-chart');
org.addEventListener('click', viewEmployee);
org.addEventListener('click', viewOrg);

const search = document.getElementById('search');
search.addEventListener('submit', searchEmployee);

const searchResults = document.getElementById('search-results');
searchResults.addEventListener('click', viewEmployee);
searchResults.addEventListener('click', viewOrg);

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
  var init = { method: method,
                 headers: {'Content-Type': 'application/json'},
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

  for (let key in employee) {
    employee[key] = employee[key].toUpperCase();
  }

  fetch('/newemployee/', {
    method: 'POST',
    headers: {'Content-Type', 'application/json'},
    body: JSON.stringify(employeee)
    mode: 'cors',
    cache: 'default'
  })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        alert(response.error);
      }
      else if (response.success) {
        hidden('employee-profile', 'remove');
        hidden('org-chart', 'add');
        hidden('search-results', 'add');
        hidden('edit-profile', 'add');

        alert(response.success);
      }
    })
}


function viewEmployee(event) {
  event.preventDefault();

  if (event.target.classList.contains('profile-button') || event.target.classList.contains('manager-profile') || event.target.classList.contains('employee-profile') || event.target.classList.contains('report-profile') || event.target.classList.contains('search-profile')) {
    let employeeId = '';
    if (event.target.classList.contains('profile-button')) {
      const employeeData = new FormData(event.target);
      employeeId = employeeData.get('id');
    }
    else {
      employeeId = event.target.classList[3];
    }

    //employee.id = employee.id.toUpperCase();

    fetchData('', 'GET', `/viewemployee/${employeeId}`)
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

          hidden('employee-profile', 'remove');
          hidden('org-chart', 'add');
          hidden('search-results', 'add');
          hidden('edit-profile', 'add');


          document.getElementById('find-id').value = '';
        }
      })
  }
}


function renderProfile(response) {
  const c = createElement;
  const profile =
    c('div', {id: 'view-profile', class: 'ui equal width grid container'}, [
      c('div', {class: 'ui hidden divider'}, []),
      c('div', {class: 'row'}, [
        c('div', {class: 'twelve wide column'}, [
          c('div', {class: 'row'}, [
            c('span', {id: 'profile-first'}, [`${response.first_name} `]),
            c('span', {id: 'profile-last'}, [response.last_name])
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
                c('span', {id: 'profile-title'}, [response.job_title])
              ]),
              c('div', {class: 'row'}, ['Job Description: ',
                c('span', {id: 'profile-description'}, [response.job_description])
              ]),
              c('div', {class: 'row'}, ['Email: ',
                c('span', {id: 'profile-email'}, [response.email])
              ]),
              c('div', {class: 'row'}, ['Manager ID: ',
                c('span', {id: 'profile-manager'}, [response.manager_id])
              ]),
              c('div', {class: 'row'}, ['Manager Name: ',
                c('span', {id: 'profile-manager-name'}, [`${response.manager_first_name} ${response.manager_last_name}`])
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

    fetchData('', 'GET', `/viewemployee/${employee.id}`)
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

        hidden('employee-profile', 'add');
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
    employee[key] = employee[key].toUpperCase();
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

    const confirm = window.confirm(`Are you sure you would like to delete Employee ${employee.id} ${employee.first} ${employee.last}?`);

    if (!confirm) {
      return;
    }

    fetchData(employee, 'DELETE', `/deleteemployee/${employee.id}`)
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


function searchEmployee(event) {
  event.preventDefault();
  const employeeData = new FormData(event.target);

  const employee = employeeData.get('emp-search').trim();
  const searchArray = employee.split(' ');

  if (searchArray.length === 0) return;

  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild)
  }
  const results = `Showing results for \'${employee}\'`;
  searchResults.appendChild(document.createTextNode(results));

  if (searchArray.length === 1 || searchArray.lenght === 3) {
    const resultsArray = [];
    fetchData('', 'GET', `/orgchartemployee/${searchArray[0]}`)
    .then(response => {
      if (response.id === searchArray[0]) {
        resultsArray.push(response);
      }
    })
    .then ( () => {
      fetchData('', 'GET', `/searchname/${searchArray[0]}`)
        .then(response => {
          if (response) {
            response.forEach( (result) => {
              resultsArray.push(result);
            })
          }
        })
        .then ( () => {
          resultsArray.forEach( (result) => {
            let addResult = renderEmployee('search', result);
            searchResults.appendChild(addResult);
          })
        })
    })
  }

  if (searchArray.length === 2) {
    fetchData('', 'GET', `/searchnames/${searchArray[0]}/${searchArray[1]}`)
      .then(response => {
        if (response) {
          response.forEach( (result) => {
            let addResult = renderEmployee('search', result);
            searchResults.appendChild(addResult);
          })
        }
      })
  }

  document.getElementById('emp-search').value = '';
  hidden('employee-profile', 'add');
  hidden('org-chart', 'add');
  hidden('search-results', 'remove');
  hidden('edit-profile', 'add');

}


function viewOrg(event) {
  event.preventDefault();
  if (event.target.classList.contains('org-button') || event.target.classList.contains('manager-org') || event.target.classList.contains('employee-org') || event.target.classList.contains('report-org') ||
  event.target.classList.contains('search-org')) {
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

    fetchData('', 'GET', `/orgchartemployee/${managerId}`)
      .then(response => {
        const manager = renderEmployee('manager', response);
        const orgChart = document.getElementById('org-chart');
        if (orgChart.lastChild) orgChart.removeChild(orgChart.lastChild);
        orgChart.appendChild(manager);

        hidden('employee-profile', 'add');
        hidden('org-chart', 'remove');
        hidden('search-results', 'add');
        hidden('edit-profile', 'add');
      })
      .then ( () => {
        fetchData('', 'GET', `/orgchartemployee/${employeeId}`)
          .then(response => {
            const employee = renderEmployees(response);
            const manager = document.getElementById('org-manager');
            manager.appendChild(employee);
          })
          .then ( () => {
            fetchData('', 'GET', `/orgchartpeers/${employeeId}/${managerId}`)
              .then(response => {
                const managerOrg = document.getElementById('org-manager');

                response.forEach( (peer) => {
                  let addPeer = renderEmployees(peer);
                  managerOrg.appendChild(addPeer);
                })
              })
              .then ( () => {
                fetchData('', 'GET', `/orgchartreports/${employeeId}`)
                  .then(response => {
                    const employeeOrg = document.getElementById(employeeId);
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


function renderEmployee(title, response) {
  const c = createElement;
  const employee =
    c('div', {id: `org-${title}`, class: 'ui equal width grid container'}, [
      c('div', {class: 'ui hidden divider'}, []),
      c('div', {class: 'row'}, [
        c('div', {class: 'ten wide column'}, [
          c('div', {class: 'ui row grid'}, [
            c('div', {class: 'four wide column'}, [
              c('img', {id: `${title}-photo`, class: 'ui small image', alt: 'Profile Photo', src: response.photo}, [])
            ]),
            c('div', {class: 'twelve wide column'}, [
              c('div', {class: 'row'}, ['Name: ',
                c('span', {id: `${title}-first`}, [`${response.first_name} `]),
                c('span', {id: `${title}-last`}, [response.last_name])
              ]),
              c('div', {class: 'row'}, ['ID: ',
                c('span', {id: `org-${title}-id`}, [response.id])
              ]),
              c('div', {class: 'row'}, ['Job Title: ',
                c('span', {id: `${title}-title`}, [response.job_title])
              ]),
              c('div', {class: 'row'}, ['Email: ',
                c('span', {id: `${title}-email`}, [response.email])
              ])
            ])
          ])
        ]),
        c('div', {class: 'four wide column'}, [
          c('div', {class: 'ui one column centered grid'}, [
            c('div', {class: 'row'}, [
              c('button', {class: `ui button ${title}-profile ${response.id} ${response.manager_id}`, type: 'submit'}, ['View Profile'])
            ]),
            c('div', {class: 'row'}, [
              c('button', {class: `ui button ${title}-org ${response.id} ${response.manager_id}`, type: 'submit'}, ['Org Chart'])
            ])
          ])
        ])
      ])
    ]);
  return employee;
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
                c('span', {class: 'employee-first'}, [`${response.first_name} `]),
                c('span', {class: 'employee-last'}, [response.last_name])
              ]),
              c('div', {class: 'row'}, ['ID: ',
                c('span', {class: 'employee-id'}, [response.id])
              ]),
              c('div', {class: 'row'}, ['Job Title: ',
                c('span', {class: 'employee-title'}, [response.job_title])
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
              c('button', {class: `ui button employee-profile ${response.id} ${response.manager_id}`, type: 'submit'}, ['View Profile'])
            ]),
            c('div', {class: 'row'}, [
              c('button', {class: `ui button employee-org ${response.id} ${response.manager_id}`, type: 'submit'}, ['Org Chart'])
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
                c('span', {class: 'report-first'}, [`${response.first_name} `]),
                c('span', {class: 'report-last'}, [response.last_name])
              ]),
              c('div', {class: 'row'}, ['ID: ',
                c('span', {class: 'report-id'}, [response.id])
              ]),
              c('div', {class: 'row'}, ['Job Title: ',
                c('span', {class: 'report-title'}, [response.job_title])
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
              c('button', {class: `ui button employee-profile ${response.id} ${response.manager_id}`, type: 'submit'}, ['View Profile'])
            ]),
            c('div', {class: 'row'}, [
              c('button', {class: `ui button report-org ${response.id} ${response.manager_id}`, type: 'submit'}, ['Org Chart'])
            ])
          ])
        ])
      ])
    ]);
  return report;
}
