const express = require('express');
const app = express();
const port = 3000;
const dbclient = require('pg').Client;

const credentials = {
  user: process.env.dbuser,
  host: process.env.dbhost,
  database: "postgres",
  password: process.env.dbpwd,
  port: 5432,
};

async function getDbclient() {
  const client = new dbclient(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();
  return now;
}

app.get('/', async (req, res) => {
  const clientResult = await getDbclient();
  console.log(clientResult);
  res.send('Hello World! ' + clientResult.rows[0]["now"]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
