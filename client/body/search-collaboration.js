const React = require('react');
const { connect } = require('react-redux');


const SearchCollaboration = ({ currentView, searchResults}) => {
  if (searchResults.isEmployee) return null;

  return (
    <div className='ui grid container'>
      { (currentView === 'search-collaboration')
          ? <div id='search-results'>Showing results for '{ searchResults.search }'</div>
          : null
      }
      { searchResults.results.map((collaboration, i) => {
          return (
          <div key={ i } id={ collaboration.collaboration_id } className='ui equal width grid container collaboration'>
            <div className='ui hidden divider'></div>
            <div className='row'>
              <div className='two wide column'></div>
              <div className='ten wide column'>
                <div className='ui row grid'>
                  <div className='twelve wide column'>
                    <div className='row'>Collaboration Type:
                      <span className='collaboration-type'> { collaboration.type }</span>
                    </div>
                    <div className='row'>Collaboration ID:
                      <span className='collaboration-id'> { collaboration.collaboration_id }</span>
                    </div>
                    <div className='row'>Collaboration Name:
                      <span className='collaboration-name'> { collaboration.collaboration_name }</span>
                    </div>
                    <div className='row'>
                      <div className='collaboration-description-label'>Description:</div>
                      <div className='collaboration-description'> { collaboration.description }</div>
                    </div>
                    <div className='row'>Managed By:
                      <span className='collaboration-manager'> { collaboration.managed_by }</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='two wide column'>
              </div>
            </div>
          </div>
        )})}
    </div>
  )
}


const mapStatetoProps = ({ currentView, searchResults }) => ({ currentView, searchResults });


module.exports = connect(mapStatetoProps)(SearchCollaboration);
