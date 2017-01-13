const newEmployee = document.getElementById('new-employee');

function createEmployee(event) {
  event.preventDefault();
  const newEmployee = {
    id: document.getElementById('employee-id'),
    first: document.getElementById('employee-first'),
    last: document.getElementById('employee-last'),
    photo: document.getElementById('employee-photo'),
    title: document.getElementById('employee-title'),
    email: document.getElementById('employee-email'),
    manager: document.getElementById('employee-mgr'),
  };

}

newEmployee.addEventListener('submit', createEmployee);
