// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const db = require('./queries.js');
// const port = 3001;

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );
// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' });
// });

// app.get('/users', db.getUsers);
// app.get('/users2', db.getUsers2);

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`);
// });

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
// get driver connection
const dbo = require('./db/conn');

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
