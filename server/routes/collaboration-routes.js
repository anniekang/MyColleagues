const { Router } = require('express')


const CollaborationRoutes = (driver) => {
  const router = new Router;

  router.post('/', (req, res) => {
    const parameters = req.body;
    const session = driver.session();
    session
      .run(`
        MATCH (col:Collaboration {collaboration_id: { Collaboration_ID }})
        RETURN col`,
        parameters)
      .then( result => {
        if (result.records.length === 0) {
          return session.run(`
            MATCH (mgr: Employee {id: { Managed_By }})
            WITH mgr
            CREATE (new:Collaboration {type: { Type }, collaboration_id: { Collaboration_ID }, collaboration_name: { Collaboration_Name }, description: { Description }, managed_by: { Managed_By }})
            CREATE UNIQUE (new)-[rel:MANAGED_BY]->(mgr)
            RETURN new.type AS type, new.collaboration_id AS collaboration_id, new.collaboration_name AS collaboration_name, new.description AS description, new.managed_by AS managed_by`,
            parameters)
        }
        else {
          session.close();
          res.status(400).json({error: 'id'});
        }
      })
      .then( result => {
        if (result.records.length === 0){
          session.close();
          res.status(400).json({error: 'managed_by'});
        }
        else {
          const results = {};
          result.records[0].forEach( (value, key) => {
            results[key] = value;
          })
          session.close();
          res.json(results);
        }
      })
      .catch( error => res.json(error) );
  });

  router.get('/:id', (req, res) => {
    console.log(req.params.id)
    const session = driver.session();
    session
      .run(`
        MATCH (view:Collaboration)-[:MANAGED_BY]->(emp:Employee)
        WHERE view.collaboration_id = { id } OR emp.id = { id }
        RETURN view`,
        {id: req.params.id})
      .then( result => {
        console.log(result)
        const results = [];
        for (let i = 0; i < result.records.length; i++) {
          let temp = {};
          result.records[i].forEach( (value, key) => {
          temp[key] = value;
          })
          results.push(temp.view.properties);
        }
        session.close();
        console.log(results)
        res.json(results);
      })
      .catch( error => res.json(error) );
  });

  router.put('/', (req, res) => {
    const parameters = req.body;
    console.log(parameters);
    const session = driver.session();
    session
      .run(`
        MATCH (emp:Employee {id: { Managed_By }})
        RETURN emp`,
        parameters)
        .then(result => {
          if (result.records.length === 1) {
            return session.run(`
              MATCH (update:Collaboration {collaboration_id: { Collaboration_ID }})-[del:MANAGED_BY]->(:Employee)
              DELETE del
              WITH update
              MATCH (update_mgr:Employee {id: { Managed_By }})
              CREATE UNIQUE (update)-[:MANAGED_BY]->(update_mgr)
              SET update.collaboration_name = { Collaboration_Name }, update.description = { Description }, update.managed_by = { Managed_By }
              RETURN update.collaboration_id AS collaboration_id, update.collaboration_name AS collaboration_name, update.description AS description, update.managed_by AS managed_by`,
              parameters)
          }
          else {
            session.close();
            res.status(400).json({error: 'managed_by'});
          }
        })
      .then(result => {
        const results = {};
        result.records[0].forEach( (value, key) => {
          results[key] = value;
        })
        session.close();
        res.json(results);
      })
      .catch( error => res.json(error) );
  });

  return router;
}


module.exports = CollaborationRoutes;
