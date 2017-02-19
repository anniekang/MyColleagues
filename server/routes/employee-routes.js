const { Router } = require('express')

const EmployeeRoutes = (driver) => {
  const router = new Router;

  router.post('/loadcsv', (req, res) => {
    const session = driver.session();
      session
        .run(`
          LOAD CSV WITH HEADERS FROM "https://dl.dropboxusercontent.com/u/12239436/mock_org_chart.csv" AS line
          CREATE(n:Employee { id: line.id, first_name: line.first, last_name: line.last, photo: line.photo, job_title: line.title, job_description: line.description, email: line.email, manager_id: line.manager})
          RETURN n`)
        .then( result => {
          if (result.records.length === 11) {
            return session.run(`
            MATCH (n:Employee)
            WITH n
            MATCH (mgr: Employee {id:n.manager_id})
            CREATE UNIQUE (n)-[:REPORTS_TO]->(mgr)
            RETURN n`)
          }
          else {
            session.close();
            res.status(400).json({ error: true });
          }
        })
        .then( result => {
          if (result.records.length === 11) {
            session.close();
            res.json({ success: true });
          }
        })
        .catch( error => {
          res.json(error);
        });
  })

  router.post('/', (req, res) => {
    const parameters = req.body;
    const session = driver.session();
    session
      .run(`
        MATCH (emp:Employee {id: { ID }})
        RETURN emp`,
        parameters)
      .then( result => {
        if (result.records.length === 0) {
          return session.run(`
            MATCH (mgr: Employee {id: { Manager_ID }})
            WITH mgr
            CREATE (new:Employee {id: { ID }, first_name: { First_Name }, last_name: { Last_Name }, photo: { Photo }, job_title: { Job_Title }, job_description: { Job_Description }, email: { Email }, manager_id: { Manager_ID }})
            CREATE UNIQUE (new)-[rel:REPORTS_TO]->(mgr)
            RETURN new.id AS id, new.first_name AS first_name, new.last_name AS last_name, new.photo AS photo, new.job_title AS job_title, new.job_description AS job_description, new.email AS email, new.manager_id AS manager_id, mgr.first_name AS manager_first_name, mgr.last_name AS manager_last_name`,
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
          res.status(400).json({error: 'manager'});
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

  router.get('/:id', (req, res) => {
    const session = driver.session();
    session
      .run(`
        MATCH (view:Employee {id: { id }})-[:REPORTS_TO]->(mgr:Employee)
        RETURN view.id AS id, view.first_name AS first_name, view.last_name AS last_name, view.photo AS photo, view.job_title AS job_title, view.job_description AS job_description, view.email AS email, view.manager_id AS manager_id, mgr.first_name AS manager_first_name, mgr.last_name AS manager_last_name`,
        {id: req.params.id})
      .then( result => {
        if (result.records.length === 0) {
          session.close();
          res.status(400).json({error: `Employee ${req.params.id} does not exist.`});
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

  router.put('/', (req, res) => {
    const parameters = req.body;
    const session = driver.session();
    session
      .run(`
        MATCH (mgr:Employee {id: { Manager_ID }})
        RETURN mgr`,
        parameters)
        .then(result => {
          if (result.records.length === 1) {
            return session.run(`
              MATCH (update:Employee {id: { ID }})-[del:REPORTS_TO]->(:Employee)
              DELETE del
              WITH update
              MATCH (update_mgr:Employee {id: { Manager_ID }})
              CREATE UNIQUE (update)-[:REPORTS_TO]->(update_mgr)
              SET update.first_name = { First_Name }, update.last_name = { Last_Name }, update.photo = { Photo }, update.job_title = { Job_Title }, update.job_description = { Job_Description }, update.email = { Email }, update.manager_id = { Manager_ID }
              RETURN update.id AS id, update.first_name AS first_name, update.last_name AS last_name, update.photo AS photo, update.job_title AS job_title, update.job_description AS job_description, update.email AS email, update.manager_id AS manager_id, update_mgr.first_name AS manager_first_name, update_mgr.last_name AS manager_last_name`,
              parameters)
          }
          else {
            session.close();
            res.status(400).json({error: 'manager'});
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

      .catch(error => {
        res.json(error);
      });
  });

  router.delete('/:id', (req, res) => {
    const session = driver.session();
    session
      .run(`
        MATCH (del:Employee {id: { id }}) DETACH DELETE del`,
        {id: req.params.id})
      .then( () => {
        return session.run(`
          MATCH (emp:Employee {id: { id }}) RETURN emp`,
          {id: req.params.id})
      })
        .then ( result => {
          if (result.records.length === 0) {
            session.close();
            res.json({success: true});
          }
          else {
            session.close();
            res.status(501).json({error: true});
          }

        })
      .catch( error => {
        res.json(error);
      });
  });

  router.get('/search/:search', (req, res) => {
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
      .catch( error => {
        res.json(error);
      });
  });

  router.get('/searchnames/:firstname/:lastname', (req, res) => {
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
      .catch( error => {
        res.json(error);
      });
  });

  router.get('/orgchart/:id/:managerId', (req, res) => {
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
      .catch( error => {
        res.json(error);
      });
  });

  return router;
}

module.exports = EmployeeRoutes;
