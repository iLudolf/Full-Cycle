import Express, { Request, Response } from 'express';

import mysql from 'mysql2';

const app = Express()
const port = 3000

const connection =  mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'example', 
  database: 'fullcycle'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const sql = "INSERT INTO people (first_name, last_name, age) VALUES ('Israel', 'Ludolf', '26')";

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});

// connection.end();

app.get('/', (req:  Request, res: Response) => {
  res.send('<h1>Full Cycle Rocks!</h1>')
})

app.get('/peoples', async (req:  Request, res: Response) => {
  const sql = 'SELECT * FROM fullcycle.people' 
  
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



