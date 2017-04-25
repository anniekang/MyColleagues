const React = require('react');
const { connect } = require('react-redux');
const { updateProfile, deleteEmployeeSubmitted } = require('../actions/employee-actions');
const { renderOrgChart } = require('../actions/org-chart-actions');
const { newCollab, updateCollab, deleteCollabSubmitted } = require('../actions/collaboration-actions');

const Twitter = ( { twitterName } ) => {
  if (!twitterName) return null;
  const twitterHref = `https://twitter.com/${twitterName}`;
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  }(document, "script", "twitter-wjs"));

  return (
    <a href={ twitterHref } className="twitter-follow-button" data-show-count="false" data-show-screen-name="false">Follow @{ twitterName }</a>
  )
};

const ViewEmployee = ({ currentUser, viewEmployee, handleClick }) => {
  const defaultPhoto = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0PDQ0NDQ0NDQ0NDQ8NDg8ODRAOFREWFhYRFRUYHSggGBonHRUVITEhJTUrLi81Fx8zODMsNygwLisBCgoKDQ0NDg0NGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAAIBAQYCCAUDBQAAAAAAAAABAgMEBREhIlExcRITMkFhcoGhM0Kx0fFSkcEUFSNikv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAAVAAAAAAAAAAAAAAAAAAjYAjDIwBGGRgeoAAAAAAAAKaVrvCNPKOuXsubA3CSmlxklzaOBWtdSfGTw2WSPAD6aM0+Ek+TRT5g96NrqQ4SeGzzQH0ANKyXhGplLRL2fJm6wDMWXEgAjYbIBCMMmIHuAAAAAAHnaa3VwlLbhzA0rztnR0QefzPbwRySt4tt5t5t+JAAAKAAAHVu22dLRN5/K91szkhNrBrJrNPZgfTEPKzVushGW6z5956EBsxZWYsAYsuJi2BtAAAAABzb5nlCO7cn6fk6Ryr67VPyv6gc0AFAAAARgARlMWB1bnnipx2akvX8HQxOVc71T8sfqdRkEJiGRgRsmIbMWBugAAAABzr6hphLZuL9cPsdE87TS6yEo7rLn3AfOAsotNp5NPBrYhQAIAAZAIwAk28Fm3kl4gdO54ZTlu0lyX5OgzzoUurjGOyz595niQRmLZWzFgGYsMxbA6AAAAAAAAOfeVj6WuC1LtLdHIPpzTtdgjUzWmW64PmgOGDYrWKpDjFtbxzRrNlBkHE96VjqS4RwW8skBrs6t3WPo65rU1pWy3PSy2GNPN6pbvguSNpkBmLYZGBGzFsrMWAxMWw2YtgdMAAAAABjUqKKcpPBLicS2W6VTJaYbd75gdG0XjCGS1v/AF+5pSvWeOUYpbZv3NAgHYpXpB9pSg/+ke39XSl88PU4AA7ztdKPzx9DXq3nBdlSk/2XuccAb391njnGLW2a9zao3hCeTbg/H7nFZAPpGYtnFsttlTyeqG3euR141FJJxeKYFZGwzFgGzBsrZi2B1gAAANO9K3Qp4LjPFeneBzrwtXWSwXYjw8fE1ACiMBkAEbDIAI2MTFgCAjYA97FaureDeiXHwe5rmLA+iZi2at3VulDB8YZencbDIDZiGyAdkAADi3vUxqYfpSX7nZPn7a8atTzMDwIwQoEYIBTErMWwDMSkbAjICARkDI2Bt3bUwnh+pYfydRnEsr/yQ8yR2mQGTEEA7QBGAPnbZ8Sp52fQnzts+JU87A8SMpGUCAxbAYkYZABiysjAjZiUxYBmJWYgetl+JDzI7bZw7N24eZHbIGJCkA//2Q==';

  const first = viewEmployee.employee.first_name.substr(0,1) + viewEmployee.employee.first_name.substr(1).toLowerCase();
  const last = viewEmployee.employee.last_name.substr(0,1) + viewEmployee.employee.last_name.substr(1).toLowerCase();
  const email = `mailto:${viewEmployee.employee.email }`;
  const linkedinAlt = `View ${first} ${last}'s profile on LinkedIn`;
  const editButton = `ui button edit-profile ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;
  const orgButton = `ui button employee-org ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;
  const delButton = `ui button del-profile ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;
  const newCollabButton = `ui button new-collab ${viewEmployee.employee.id} ${viewEmployee.employee.manager_id}`;

  return (
    <div className='ui grid container'>
      <div className='row'>
        <div id='view-profile' className='ui grid container'>
          <div className='ui fourteen wide centered column row'>
            <div className='thirteen wide column'>
              <div className='row'>
                <span id='profile-first'>{ first }</span>
                <span id='profile-last'> { last }</span>
              </div>
              <div className='ui hidden divider'></div>
              <div className='ui row grid'>
                <div className='four wide column'>
                  <img id='profile-photo' className='ui small centered image' alt='Profile Photo' src={ viewEmployee.employee.photo || defaultPhoto }/>
                </div>
                <div id='profile-info' className='twelve wide column'>
                  <div className='row'>ID:
                    <span id='profile-id'> { viewEmployee.employee.id }</span>
                  </div>
                  <div className='row'>Job Title:
                    <span id='profile-title'> { viewEmployee.employee.job_title }</span>
                  </div>
                  <div className='row'>
                    <div id='profile-description-label'>Job Description:</div>
                    <div id='profile-description'> { viewEmployee.employee.job_description }</div>
                  </div>
                  <div className='row'>Email:
                    <a id='profile-email' href={ email }> { viewEmployee.employee.email } </a>
                  </div>
                  <div className='row'>Manager ID:
                    <span id='profile-manager'> { viewEmployee.employee.manager_id }</span>
                  </div>
                  <div className='row'>Manager Name:
                    <span id='profile-manager-name'> { viewEmployee.employee.manager_first_name } { viewEmployee.employee.manager_last_name }</span>
                  </div>
                  { viewEmployee.employee.linkedin
                    ? <div className='row'>
                        <a href={ viewEmployee.employee.linkedin }>
                          <img src='https://static.licdn.com/scds/common/u/img/webpromo/btn_liprofile_blue_80x15.png' width='100' height='20' alt={ linkedinAlt }/>
                        </a>
                      </div>
                    : null
                  }
                  <div className='row'>
                    <Twitter twitterName={ viewEmployee.employee.twitter}/>
                  </div>
                </div>
              </div>
            </div>
            <div className='three wide column'>
              <div className='ui one column centered grid'>
                <div className='ui hidden divider'></div>
                { (currentUser.employeeFound && viewEmployee.employee.id === currentUser.employeeId) || currentUser.ITConfirmed
                  ? <div className='row'>
                      <button id='edit-button' className={ editButton } type='submit' onClick={ handleClick('edit') }>Edit Profile</button>
                    </div>
                  : null
                }
                <div className='row'>
                  <button id='org-button' className={ orgButton } type='submit' onClick={ handleClick('org') }>Org Chart</button>
                </div>
                  { currentUser.ITConfirmed
                      ? <div className='row'>
                          <button id='delete-button' className={ delButton } type='submit' onClick={ handleClick('del') }>Delete Profile</button>
                        </div>
                      : null
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ui hidden divider'></div>
      <div className='row'>
        <div id='view-profile-collabs' className='ui grid container'>
          <div className='ui fourteen wide centered column row'>
            <div id='collaborations' className='thirteen wide column'>
              <div className='row'>
                <span id='collaboration'>Collaborations</span>
              </div>
            </div>
            <div className='three wide column'>
              <div className='ui one column centered grid'>
                { (currentUser.employeeFound && viewEmployee.employee.id === currentUser.employeeId) || currentUser.ITConfirmed
                  ? <div className='row'>
                      <button id='new-collab-button' className={ newCollabButton } type='submit' onClick={ handleClick('newCollab') }>New Collaboration</button>
                    </div>
                  : null
                }
              </div>
            </div>
          </div>
          <div className='ui fourteen wide centered column row'>
              { viewEmployee.collabs.map((collab, i) => {
                  let editCollabButton = `ui tiny button edit-collab ${viewEmployee.employee.id} ${collab.collaboration_id}`;
                  let deleteCollabButton = `ui tiny button delete-collab ${viewEmployee.employee.id} ${collab.collaboration_id}`;

                  return (
                    <div key={ i } className="ui centered grid">
                      <div className='twelve wide column'>
                        <div className='row collab-info'>
                          <div className='row'>Collaboration Type:
                            <span className='collab-type'> { collab.type }</span>
                          </div>
                          <div className='row'>Collaboration ID:
                            <span className='collab-id'> { collab.collaboration_id }</span>
                          </div>
                          <div className='row'>Collaboration Name:
                            <span className='collab-name'> { collab.collaboration_name }</span>
                          </div>
                          <div className='row'>
                            <div className='collab-description-label'>Description:</div>
                            <div className='collab-description'> { collab.description }</div>
                          </div>
                          <div className='row'>Managed By:
                            <span className='collab-manager'> { collab.managed_by }</span>
                          </div>
                          <div className='ui hidden divider'></div>
                        </div>
                      </div>
                      <div className='two wide column'>
                        { (currentUser.employeeFound && viewEmployee.employee.id === currentUser.employeeId) || currentUser.ITConfirmed
                          ? <div className='ui one column centered grid'>
                              <button className={ editCollabButton } type='submit' onClick={ handleClick('updateCollab') }>Edit</button>
                              <button className={ deleteCollabButton } type='submit' onClick={ handleClick('deleteCollab') }>Delete</button>
                            </div>
                          : null
                        }
                      </div>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStatetoProps = ({ currentUser, viewEmployee }) => ({ currentUser, viewEmployee });

const mapDispatchtoProps = dispatch => {
  return {
    handleClick: type => event => {
      event.preventDefault();
      const employee = {
        id: event.target.classList[3].toUpperCase(),
        managerId: event.target.classList[4].toUpperCase()
      };
      const collabId = event.target.classList[4].toUpperCase();
      if (type === 'edit') dispatch(updateProfile(employee))
      else if (type === 'org') dispatch(renderOrgChart(employee))
      else if (type === 'del') dispatch(deleteEmployeeSubmitted(employee))
      else if (type === 'newCollab') dispatch(newCollab(employee))
      else if (type === 'updateCollab') dispatch(updateCollab(collabId))
      else if (type === 'deleteCollab') dispatch(deleteCollabSubmitted(collabId))
    }
  }
};


module.exports = connect(mapStatetoProps, mapDispatchtoProps)(ViewEmployee);
