const express = require('express');
const serverless = require('serverless-http');
const schoolRoutes = require('../../routes/schoolRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/.netlify/functions/api', schoolRoutes);

module.exports.handler = serverless(app);