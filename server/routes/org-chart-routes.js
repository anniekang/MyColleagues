const { Router } = require('express')


const OrgChartRoutes = (driver) => {
  const router = new Router;

  router.get('/:id/:managerId', (req, res) => {
    const parameters = {
      id: req.params.id,
      managerId: req.params.managerId
    }
    const orgChart = [];
    const session = driver.session();
    session
      .run(`
        MATCH (view:Employee {id: { managerId }})
        RETURN view.id AS id, view.first_name AS first_name, view.last_name AS last_name, view.photo AS photo, view.job_title AS job_title, view.email AS email, view.manager_id AS manager_id`,
        parameters)
      .then( result => {
        const results = {};
        result.records[0].forEach( (value, key) => {
          results[key] = value;
        })
        results.type = 'manager';
        orgChart.push(results);
        session.close();
      })
      .then( () => {
        return session.run(`
          MATCH (view:Employee {id: { id }})
          RETURN view.id AS id, view.first_name AS first_name, view.last_name AS last_name, view.photo AS photo, view.job_title AS job_title, view.email AS email, view.manager_id AS manager_id`,
          parameters)
      })
      .then( result => {
        const results = {};
        result.records[0].forEach( (value, key) => {
          results[key] = value;
        })
        results.type = 'employee';
        orgChart.push(results);
        session.close();
      })
      .then( () => {
        return session.run(`
        MATCH (view:Employee)-[:REPORTS_TO]->(mgr:Employee {id: { managerId }})
        WHERE NOT view.id = {id} AND NOT view.id = { managerId }
        RETURN view`,
        parameters)
      })
      .then( result => {
        const results = [];
        for (let i = 0; i < result.records.length; i++) {
          let temp = {};
          result.records[i].forEach( (value, key) => {
          temp[key] = value;
          })
          temp.view.properties.type = 'peer';
          results.push(temp.view.properties);
        }
        orgChart.push(results);
        session.close();
      })
      .then( () => {
        return session.run(`
        MATCH (view:Employee)-[:REPORTS_TO]->(mgr:Employee {id: { id }})
        RETURN view`,
        parameters)
      })
      .then( result => {
        const results = [];
        for (let i = 0; i < result.records.length; i++) {
          let temp = {};
          result.records[i].forEach( (value, key) => {
          temp[key] = value;
          })
          temp.view.properties.type = 'report';
          results.push(temp.view.properties);
        }
        orgChart.push(results);
        session.close();
        res.json(orgChart);
      })
      .catch( error => res.json(error) );
  });

  return router;
}

module.exports = OrgChartRoutes;
