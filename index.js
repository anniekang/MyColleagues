const express = require('express');
const neo4j = require('neo4j-driver').v1;
const bodyParser = require('body-parser');

const app = express();

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'students'));

app.use(express.static('src'));

app.use(bodyParser.json())

app.post('/newemployee/', (req, res) => {
  var session = driver.session();
  session
    .run("MATCH (check:Employee {id: {id}}) RETURN check.id", {id: req.body.id})
    .then( result => {
      if (result.records.length===0) {
        return session.run("CREATE (new:Employee {id: {id}, first_name: {first}, last_name: {last}, photo: {photo}, job_title: {title}, email: {email}, manager_id: {manager} }) WITH new MATCH (mgr: Employee {id: {manager}}) CREATE UNIQUE (new)-[rel:REPORTS_TO]->(mgr) RETURN new.id AS id, new.first_name AS first_name, new.last_name AS last_name, new.photo AS photo, new.job_title AS job_title, new.email AS email, new.manager_id AS manager_id, type(rel) AS relationship, mgr.first_name AS manager_first_name, mgr.last_name AS manager_last_name", {id: req.body.id, first: req.body.first, last: req.body.last, photo: req.body.photo, title: req.body.title, email: req.body.email, manager: req.body.manager})
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

app.get('/data', (req, res) => {
 res.json('Got it!');
});

app.listen(3000, () => console.log('listening at 3000'));
