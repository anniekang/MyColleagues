const express = require('express');
const neo4j = require('neo4j-driver').v1;
const babel = require('babel-polyfill');

const app = express();
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'kangaroo'));

app.use(express.static('src'));

app.get('/data', (req, res) => {
 console.log('Data retrieved');
 res.json('Got it!');
});
/*
app.post('/orgchart', (req, res) => {
 var session = driver.session();
 session
   .run("CREATE (ron:Employee {id: 'rp1', first_name:'Ron', last_name:'Perris', role_title:'Instructor, Founder'}) CREATE (annie:Employee {id: 'ak1', first_name:'Annie', last_name:'Kang', role_title:'Student'}) CREATE (annie)-[rel:REPORTS_TO]->(ron) RETURN annie.id, rel.type, ron.role_title")
   .then(function(result){
     console.log(result);
     const results = result.records.forEach(function(record) {
       console.log(record);
     });
     session.close();
     res.json(result);
   })
   .catch(function(error) {
     console.log(error);
   });
});
*/
app.post('/newemployee/:id/:first/:last', (req, res) => {
  console.log(req.params.id);

  var session = driver.session();
  session
    .run("MATCH (check:Employee {id: {id}}) RETURN check.id", {id: req.params.id})
    .then( function(result){
      if (result.records.length===0) {
        return session.run("CREATE (new:Employee {id: {id}, first_name: {first}, last_name: {last} }) RETURN new.id AS id, new.first_name AS first_name, new.last_name AS last_name", {id: req.params.id, first: req.params.first, last: req.params.last})
      }
      res.json(req.params.id + ' already exists');
    })
    .then( function(result) {
      const results = result.records[0].get('id');
      console.log(results);
      console.log(result);
      console.log(result.records[0]);
      session.close();
      res.json(results);
    })

    .catch(function(error) {
      console.log(error);
      res.json(error);
    });

});



app.listen(3000, () => console.log('listening at 3000'));
