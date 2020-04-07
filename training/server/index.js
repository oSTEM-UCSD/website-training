const PORT = 8000 || process.env.PORT;

const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

const Routes = require('./routes');

app.use('/api', Routes.api);

app.get("/", (req, res) => {
  res.send("hello!");
})

app.listen(PORT, () => console.log(`Now listening on port ${PORT}...`));