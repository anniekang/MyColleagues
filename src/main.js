let newEmployee = document.getElementById('employee');
newEmployee.addEventListener('submit', createEmployee);

const getEmployee = document.getElementById('find-employee');
getEmployee.addEventListener('submit', viewEmployee);

let editEmployee = document.getElementById('edit-button');
editEmployee.addEventListener('click', updateEmployee);



function hidden(item, change) {
  const check = document.getElementById(item);
  if (change === 'add') {
    check.classList.add('invisible', 'section', 'hidden');
  }
  else {
    check.classList.remove('invisible', 'section', 'hidden');
  }
}
//hidden('heading','remove');

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
    mgr: employeeData.get('manager-id'),
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
        const created = 'Employee ' + response.id + ' ' + response.first_name + ' ' + response.last_name + ' has been successfully created.';
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
        let idUnsuccessful = response.error;
        alert(idUnsuccessful);
      }
      else if (response.id) {
        let first = document.getElementById('profile-first');
        if (first.lastChild) first.removeChild(first.lastChild);
        first.appendChild(document.createTextNode(response.first_name));
        let last = document.getElementById('profile-last');
        if (last.lastChild) last.removeChild(last.lastChild);
        last.appendChild(document.createTextNode(response.last_name));
        let photo = document.getElementById('profile-photo');
        photo.setAttribute('src', response.photo);
        let id = document.getElementById('profile-id');
        if (id.lastChild) id.removeChild(id.lastChild);
        id.appendChild(document.createTextNode(response.id));
        let title = document.getElementById('profile-title');
        if (title.lastChild) title.removeChild(title.lastChild);
        title.appendChild(document.createTextNode(response.job_title));
        let email = document.getElementById('profile-email');
        if (email.lastChild) email.removeChild(email.lastChild);
        email.appendChild(document.createTextNode(response.email));
        let mgr = document.getElementById('profile-mgr-id');
        if (mgr.lastChild) mgr.removeChild(mgr.lastChild);
        mgr.appendChild(document.createTextNode(response.manager_id));
        let mgrName = document.getElementById('profile-mgr-name');
        if (mgrName.lastChild) mgrName.removeChild(mgrName.lastChild);
        mgrName.appendChild(document.createTextNode(response.manager_first + ' ' + response.manager_last));

        hidden('view-profile', 'remove');
        document.getElementById('find-id').value = '';
      }
    })
}

function updateEmployee(event) {
  event.preventDefault();
  let employee = {
    id: document.getElementById('profile-id').textContent
  };

  var headers = new Headers();
 headers.append('Content-Type', 'application/json');

 const request = new Request('/viewemployee/' + employee.id);

 fetchData(employee, 'GET', headers, request)
   .then(response => {
      hidden('view-profile', 'add');
      console.log(response);
      let profile = document.getElementById('employee');
      profile.classList.add('edit');
      document.getElementById('employee-id').value = document.getElementById('profile-id').textContent;

      document.getElementById('employee-first').value = document.getElementById('profile-first').textContent;
      document.getElementById('employee-last').value = document.getElementById('profile-last').textContent;
      let photo = document.getElementById('profile-photo');
      document.getElementById('employee-photo').value = photo.getAttribute('src');
      document.getElementById('employee-title').value = document.getElementById('profile-title').textContent;
      document.getElementById('employee-description').value = document.getElementById('profile-description').textContent;
      document.getElementById('employee-email').value = document.getElementById('profile-email').textContent;
      document.getElementById('employee-mgr').value = document.getElementById('profile-mgr-id').textContent;

      hidden('employee-description', 'remove')
      hidden('edit-profile', 'remove');

   })

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
    mgr: employeeData.get('manager-id'),
  };

  console.log(employee);

/*  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const request = new Request('/newemployee/');

  fetchData(newEmployee, 'POST', headers, request)
    .then(response => {
      if (response.error) {
        const idExists = response.error;
        alert(idExists);
      }
      else if (response.id) {
        const created = 'Employee ' + response.id + ' ' + response.first_name + ' ' + response.last_name + ' has been successfully created.';
        alert(created);
      }
    })*/

}
