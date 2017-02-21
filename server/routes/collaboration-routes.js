const { Router } = require('express')


const CollaborationRoutes = (driver) => {
  const router = new Router;

  router.post('/', (req, res) => {
    const parameters = req.body;
    const session = driver.session();
    session
      .run(`
        MATCH (emp:Employee {id: { Managed_By }})
        RETURN emp`,
        parameters)
      .then( result => {
        if (result.records.length === 1) {
          return session.run(`
            MATCH (mgr: Employee {id: { Managed_By }})
            WITH mgr
            CREATE (new:Collaboration {type: { Type }, collaboration_name: { Collaboration_Name }, description: { Description }, managed_by: { Managed_By }})
            CREATE UNIQUE (new)-[rel:MANAGED_BY]->(mgr)
            RETURN new.type AS type, new.collaboration_name AS collaboration_name, new.description AS description, new.managed_by AS managed_by`,
            parameters)
        }
        else {
          session.close();
          res.status(400).json({error: true});
        }
      })
      .then( result => {
        const results = {};
        result.records[0].forEach( (value, key) => {
          results[key] = value;
        })
        session.close();
        res.json(results);
      })
      .catch( error => res.json(error) );
  });

  router.get('/:id', (req, res) => {
    const session = driver.session();
    session
      .run(`
        MATCH (view:Collaboration)-[:MANAGED_BY]->(emp:Employee {id: { id }})
        RETURN view`,
        {id: req.params.id})
      .then( result => {
        const results = [];
        for (let i = 0; i < result.records.length; i++) {
          let temp = {};
          result.records[i].forEach( (value, key) => {
          temp[key] = value;
          })
          results.push(temp.view.properties);
        }
        session.close();
        res.json(results);
      })
      .catch( error => res.json(error) );
  });

  return router;
}

module.exports = CollaborationRoutes;
