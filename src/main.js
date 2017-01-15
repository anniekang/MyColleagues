const newEmployee = document.getElementById('employee');

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

  var myHeaders = new Headers();

  var myInit = { method: 'POST',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };

   /*const getData = fetch('/data/', myInit);
   getData
     .then(result => result.json())
     .catch(error => console.error(error.data))
   */
   const createNew = fetch('/newemployee/' + newEmployee.id.value + '/' + newEmployee.first.value + '/' + newEmployee.last.value, myInit);
   createNew
     .then(result => result.json())
     .catch(error => console.error(error.data))
}

newEmployee.addEventListener('submit', createEmployee);
