const React = require('react');
const { connect } = require('react-redux');
const { renderProfile } = require('../../actions/employee-actions');
const { renderOrgChart } = require('../../actions/org-chart-actions');


const OrgSearchEmployee = ({ currentView, searchResults, viewOrg, handleClickProfile, handleClickOrg }) => {
  const defaultPhoto = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';

  let result = [];
  let employeeType = '';
  if (currentView === 'org-search-employee') {
    result = searchResults.results;
    employeeType = searchResults.employeeType;
  }
  else if (currentView === 'org-chart') {
    result = viewOrg.employee;
    employeeType = viewOrg.employeeType
  }

  return (
    <div className='ui grid container'>
      { (currentView === 'org-search-employee')
          ? <div id='search-results'>Showing results for '{ searchResults.search }'</div>
          : null
      }
      { result.map((employee, i) => {
          let profileButton = `ui button ${ employeeType }-profile ${employee.id} ${employee.manager_id}`;
          let orgButton = `ui button ${ employeeType }-org ${employee.id} ${employee.manager_id}`;
          return (
          <div key={ i } id={ employee.id } className='ui equal width grid container employee'>
            <div className='ui hidden divider'></div>
            <div className='row'>
              <div className='two wide column'></div>
              <div className='ten wide column'>
                <div className='ui row grid'>
                  <div className='four wide column'>
                    <img className='ui small image employee-photo' alt='Profile Photo' src={ employee.photo || defaultPhoto }/>
                  </div>
                  <div className='twelve wide column'>
                    <div className='row'>Name:
                      <span className='employee-first'> { employee.first_name}</span>
                      <span className='employee-last'> { employee.last_name }</span>
                    </div>
                    <div className='row'>ID:
                      <span className='employee-id'> { employee.id }</span>
                    </div>
                    <div className='row'>Job Title:
                      <span className='employee-title'> { employee.job_title }</span>
                    </div>
                    <div className='row'>Email:
                      <span className='employee-email'> { employee.email }</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='two wide column'>
                <div className='ui one column centered grid'>
                  <div className='row'>
                    <button className={ profileButton } type='submit' onClick={ handleClickProfile }>View Profile</button>
                  </div>
                  <div className='row'>
                    <button className={ orgButton }  type='submit' onClick={ handleClickOrg }>Org Chart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )})}
    </div>
  )
}


const mapStatetoProps = ({ currentView, searchResults, viewOrg }) => ({ currentView, searchResults, viewOrg });


const mapDispatchtoProps = dispatch => {
  return {
    handleClickProfile: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3]
      }
      dispatch(renderProfile(employee.id))
    },
    handleClickOrg: event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3],
        managerId: event.target.classList[4],
      }
      dispatch(renderOrgChart(employee))
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(OrgSearchEmployee);
