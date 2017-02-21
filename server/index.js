const express = require('express');
const neo4j = require('neo4j-driver').v1;
const babelPolyfill = require('babel-polyfill');
const bodyParser = require('body-parser');
const { PORT } = process.env;
const EmployeeRoutes = require('./routes/employee-routes');
const SearchRoutes = require('./routes/search-routes');
const OrgChartRoutes = require('./routes/org-chart-routes');

/*var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
*/

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'students'));

express()
  .use(express.static(`${__dirname}/public`))
  .use(bodyParser.json())
  .use('/employee', EmployeeRoutes(driver))
  .use('/search', SearchRoutes(driver))
  .use('/orgchart', OrgChartRoutes(driver))
  .listen(PORT || 3000, () => {
      console.log(`listening on ${PORT || 3000}`);
    })
