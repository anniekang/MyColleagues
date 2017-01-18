const newEmployee = document.getElementById('employee');
newEmployee.addEventListener('submit', createEmployee);

const getEmployee = document.getElementById('find-employee');
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
    mgr: employeeData.get('manager-id'),
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
        let name = document.getElementById('profile-name');
        if (name.lastChild) name.removeChild(name.lastChild);
        name.appendChild(document.createTextNode(response.first_name + ' ' + response.last_name));
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
        let mgr = document.getElementById('profile-mgr');
        if (mgr.lastChild) mgr.removeChild(mgr.lastChild);
        mgr.appendChild(document.createTextNode(response.manager_id + ' ' + response.manager_first + ' ' + response.manager_last));
        let viewProfile = document.getElementById('view-profile');
        viewProfile.classList.remove('invisible', 'section', 'hidden');
        document.getElementById('find-id').value = '';
      }
    })

}
