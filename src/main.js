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
        const idUnsuccessful = response.error;
        alert(idUnsuccessful);
      }
      else if (response.id) {
        console.log(response);
        /* populate profile with Employee data */
      }
    })

}
