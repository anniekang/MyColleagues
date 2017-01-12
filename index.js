const express = require('express');
const neo4j = require('neo4j-driver').v1;
const babel = require('babel-polyfill');

const app = express();
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'annie'));


app.listen(3000, () => console.log('listening at 3000'));
