const express = require("express");
bodyParser = require('body-parser');

const cors = require("cors");

const app = express();
//app.use(bodyParser.json());
app.use(express.json());

var corsOptions = {
  origin: "*",
  //["http://localhost:8081", "http://localhost:4200", "http://localhost"],
  credentials: "true"
};

app.use(cors(corsOptions));

const path = require('path');
app.use(express.static(path.join(__dirname, 'dist/angular-starter')));

require("./app/routes/quest.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
