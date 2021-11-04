import fs from 'fs'
const path = require('path');
import express from 'express';
import yaml from 'js-yaml'

import {ApigeeService, ApiManagementInterface, Developers} from 'apigee-x-module'

require('dotenv').config()

const config = yaml.load(fs.readFileSync('./config/apiportal.yaml', 'utf8'));
const app = express();
const apigeeService: ApiManagementInterface = new ApigeeService(process.env.SERVICE_ACCOUNT_EMAIL, process.env.SERVICE_ACCOUNT_KEY, process.env.APIGEE_ORG);

app.use(express.json())
app.use(express.static('public'));

app.get('/apim/apiproducts', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  apigeeService.getApiProducts().then((result) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')
      res.send({
        apiproducts: result.apiProducts
      });
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.get('/apim/apiproducts/:name', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  var result;
  config.apis.forEach(element => {
    if (element.name == req.params.name) {
      result = element;
    }
  });

  if (result)
    res.send(result);
  else
    res.status(404).send({
      error: {
        code: 404,
        message: "Not found",
        status: "NOT_FOUND"
      }
    });
});

app.get('/apim/developers', (req, res) => {
  apigeeService.getDevelopers().then((result) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')
      res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.get('/apim/developers/:email', (req, res) => {
  apigeeService.getDeveloper(req.params.email).then((result) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')

      if (result.error) {
        res.status(parseInt(result.error.code)).send({
          error: {
            code: parseInt(result.error.code),
            message: result.error.status,
            status: result.error.status
          }
        });
      }
      else
        res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.get('/apim/developers/:email/apps', (req, res) => {
  apigeeService.getApps(req.params.email).then((result) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')

      if (result.error) {
        res.status(parseInt(result.error.code)).send({
          error: {
            code: parseInt(result.error.code),
            message: result.error.status,
            status: result.error.status
          }
        });
      }
      else
        res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.get('/apim/developers/:email/apps/:appName', (req, res) => {
  apigeeService.getApp(req.params.email, req.params.appName).then((result) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')

      if (result.error) {
        res.status(parseInt(result.error.code)).send({
          error: {
            code: parseInt(result.error.code),
            message: result.error.status,
            status: result.error.status
          }
        });
      }
      else
        res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.post('/apim/developers/:email/apps', (req, res) => {
  apigeeService.createApp(req.params.email, req.body.name, req.body.apiProducts).then((result) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')

      if (result.error) {
        res.status(parseInt(result.error.code)).send({
          error: {
            code: parseInt(result.error.code),
            message: result.error.status,
            status: result.error.status
          }
        });
      }
      res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.put('/apim/developers/:email/apps/:appName', (req, res) => {
  apigeeService.updateApp(req.params.email, req.body.name, req.body).then((result) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')

      if (result.error) {
        res.status(parseInt(result.error.code)).send({
          error: {
            code: parseInt(result.error.code),
            message: result.error.status,
            status: result.error.status
          }
        });
      }
      res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.put('/apim/developers/:email/apps/:appName/keys/:keyName', (req, res) => {
  apigeeService.updateAppCredential(req.params.email, req.params.appName, req.body).then((result) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')

      if (result.error) {
        res.status(parseInt(result.error.code)).send({
          error: {
            code: parseInt(result.error.code),
            message: result.error.status,
            status: result.error.status
          }
        });
      }
      res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.listen(8080, () => {
  return console.log(`server is listening on 8080`);
});