const express = require('express');
const app = express();
const port = 3000;
const dbclient = require('pg').Client;
const random_name = require('node-random-name');

const credentials = {
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: "postgres",
  password: process.env.DBPWD,
  port: 5432,
};

initializeDatabase();

async function initializeDatabase() {
  console.log("DBHOST " + credentials.host);
  console.log("DBUSER " + credentials.user);
  await getDbclient(`CREATE TABLE if not exists public.personas (id int4 NOT NULL, "name" varchar NULL, CONSTRAINT personas_pk PRIMARY KEY (id));`);
  await getDbclient(`CREATE SEQUENCE if not exists public.pkid INCREMENT BY 1 MINVALUE 100 MAXVALUE 9223372036854775807 START 100 CACHE 1 NO CYCLE;`);
}

//I do this intentionally on every request to show that RDS proxy will not generate a new DB connection for each request
async function getDbclient(query) {
  const client = new dbclient(credentials);
  await client.connect();
  const now = await client.query(query);
  await client.end();
  return now;
}

app.get('/', async (req, res) => {
  const clientResult = await getDbclient('SELECT NOW()');
  res.send('Hello World! ' + clientResult.rows[0]["now"]);
});

app.get('/list', async (req, res) => {
  await listPersonas(res)
});

app.get('/add', async (req, res) => {
  const clientResult = await getDbclient("INSERT INTO public.personas (id, name) VALUES( nextval('pkid'), '" + random_name({first: true}) + "');");
  if(clientResult.rowCount > 0){
    await listPersonas(res);
  } else {
    res.send('Failed! ' + clientResult);
  }
});

async function listPersonas(res){
  const clientResult = await getDbclient('SELECT * FROM public.personas');
  res.send('List: ' + JSON.stringify(clientResult.rows));
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
