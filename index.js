const express = require('express');
const neo4j = require('neo4j-driver').v1;
const babelPolyfill = require('babel-polyfill');
const bodyParser = require('body-parser');

const app = express();

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'students'));

app.use(express.static('src'));

app.use(bodyParser.json());

app.post('/newemployee/', (req, res) => {
  const parameters = req.body;
  var session = driver.session();
  session
    .run(`
      MATCH (check:Employee {id: {id}}) RETURN check.id`,
      {id: req.body.id})
    .then( result => {
      if (result.records.length===0) {
        return session.run(`
          CREATE (new:Employee {id: {id}, first_name: {first}, last_name: {last}, photo: {photo}, job_title: {title}, job_description: '', email: {email}, manager_id: {managerId}})
          WITH new
          MATCH (mgr: Employee {id: {managerId}})
          CREATE UNIQUE (new)-[rel:REPORTS_TO]->(mgr)
          RETURN new.id AS id, new.first_name AS first, new.last_name AS last, new.photo AS photo, new.job_title AS title, new.job_description AS description, new.email AS email, new.manager_id AS manager_id, type(rel) AS relationship, mgr.first_name AS manager_first, mgr.last_name AS manager_last`,
          parameters)
      }
      else {
        session.close();
        res.status(400).json({error: req.body.id + ' already exists'});
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

    .catch( error => {
      res.json(error);
    });

});

app.get('/viewemployee/:id', (req, res) => {
  var session = driver.session();
  session
    .run(`
      MATCH (view:Employee {id: {id}})-[:REPORTS_TO]->(mgr:Employee)
      RETURN view.id AS id, view.first_name AS first, view.last_name AS last, view.photo AS photo, view.job_title AS title, view.job_description AS description, view.email AS email, view.manager_id AS manager_id, mgr.first_name AS manager_first, mgr.last_name AS manager_last`,
      {id: req.params.id})
    .then( result => {
      if (result.records.length===0) {
        session.close();
        res.status(400).json({error: 'Employee ' + req.params.id + ' does not exist.'});
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

    .catch( error => {
      res.json(error);
    });

});

app.get('/orgchartmanager/:id', (req, res) => {
  console.log(req.params.id);
  var session = driver.session();
  session
    .run(`
      MATCH (view:Employee {id: {id}})
      RETURN view.id AS id, view.first_name AS first, view.last_name AS last, view.photo AS photo, view.job_title AS title, view.email AS email`,
      {id: req.params.id})
    .then( result => {
      const results = {};
      result.records[0].forEach( (value, key) => {
        results[key] = value;
      })
      console.log(results);
      session.close();
      res.json(results);
    })

    .catch( error => {
      res.json(error);
    });

});

app.get('/orgchartemployee/:id', (req, res) => {
  console.log(req.params.id);
  var session = driver.session();
  session
    .run(`
      MATCH (view:Employee {id: {id}})
      RETURN view.id AS id, view.first_name AS first, view.last_name AS last, view.photo AS photo, view.job_title AS title, view.email AS email`,
      {id: req.params.id})
    .then( result => {
      const results = {};
      result.records[0].forEach( (value, key) => {
        results[key] = value;
      })
      console.log(results);
      session.close();
      res.json(results);
    })

    .catch( error => {
      res.json(error);
    });

});

app.get('/orgchartpeers/:id/:managerId', (req, res) => {
  const parameters = {
    id: req.params.id,
    managerId: req.params.managerId
  }
  console.log(parameters);

  var session = driver.session();
  session
    .run(`
      MATCH (view:Employee)-[:REPORTS_TO]->(mgr:Employee {id: {managerId}})
      WHERE NOT view.id = {id}
      RETURN view`,
      parameters)
    .then( result => {
      console.log(result);
      console.log('next');
      console.log(result.records.length)
      const results = [];
      for (let i = 0; i < result.records.length; i++) {
        let temp = {};
        result.records[i].forEach( (value, key) => {
        temp[key] = value;
        })
        console.log('temp');
        console.log(temp.view.properties);
        results.push(temp.view.properties);
      }
      console.log(results);
      session.close();
      res.json(results);
    })

    .catch( error => {
      res.json(error);
    });

});

app.put('/updateemployee/', (req, res) => {
  const parameters = req.body;
  var session = driver.session();
  session
    .run(`
      MATCH (update:Employee {id: {id}})-[:REPORTS_TO]->(mgr:Employee {id: {managerId}})
      SET update.first_name = {first}, update.last_name = {last}, update.photo = {photo}, update.job_title = {title}, update.job_description = {description}, update.email = {email}, update.manager_id = {managerId}
      RETURN update.id AS id, update.first_name AS first, update.last_name AS last, update.photo AS photo, update.job_title AS title, update.job_description AS description, update.email AS email, update.manager_id AS manager_id, mgr.first_name AS manager_first, mgr.last_name AS manager_last`,
      parameters)
    .then( result => {
      const results = {};
      result.records[0].forEach( (value, key) => {
        results[key] = value;
      })
      session.close();
      res.json(results);
    })

    .catch( error => {
      res.json(error);
    });

});

app.delete('/deleteemployee/:id', (req, res) => {
  var session = driver.session();
  session
    .run(`
      MATCH (del:Employee {id: {id}}) DETACH DELETE del`,
      {id: req.params.id})
    .then( () => {
      return session.run(`
                      MATCH (emp:Employee {id: {id}}) RETURN emp`,
                      {id: req.params.id})
    })
      .then ( result => {
        if (result.records.length===0) {
          session.close();
          res.json({success: 'Employee ' + req.params.id + ' has been deleted.'});
        }
        else {
          session.close();
          res.status(501).json({error: 'Employee ' + req.params.id + ' still exists'});
        }

      })

    .catch( error => {
      res.json(error);
    });

});

app.listen(3000, () => console.log('listening at 3000'));
