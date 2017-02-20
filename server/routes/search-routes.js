const { Router } = require('express')


const SearchRoutes = (driver) => {
  const router = new Router;

  router.get('/:search', (req, res) => {
    const parameters = {
      search: req.params.search
    }
    const session = driver.session();
    session
      .run(`
        MATCH (search:Employee)
        WHERE search.id = { search } OR search.id CONTAINS { search }
        RETURN search
        UNION
        MATCH (search:Employee)-[:REPORTS_TO]->(Employee)
        WHERE search.first_name CONTAINS { search } OR search.last_name CONTAINS { search }
        RETURN search`,
        parameters)
      .then( result => {
        const results = [];
        for (let i = 0; i < result.records.length; i++) {
          let temp = {};
          result.records[i].forEach( (value, key) => {
            temp[key] = value;
          })
          results.push(temp.search.properties);
        }
        session.close();
        res.json(results);
      })
      .catch( error => res.json(error) );
  });

  router.get('/names/:firstname/:lastname', (req, res) => {
    const parameters = {
      firstName: req.params.firstname,
      lastName: req.params.lastname
    }
    const session = driver.session();
    session
      .run(`
        MATCH (search:Employee)-[:REPORTS_TO]->(Employee)
        WHERE search.first_name CONTAINS { firstName }
        RETURN search
        UNION
        MATCH (search:Employee)-[:REPORTS_TO]->(Employee)
        WHERE search.last_name CONTAINS { lastName }
        RETURN search`,
        parameters)
      .then( result => {
        const results = [];
        for (let i = 0; i < result.records.length; i++) {
          let temp = {};
          result.records[i].forEach( (value, key) => {
            temp[key] = value;
          })
          results.push(temp.search.properties);
        }
        session.close();
        res.json(results);
      })
      .catch( error => res.json(error) );
  });

  return router;
}

module.exports = SearchRoutes;
