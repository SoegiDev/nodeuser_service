const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const app = express();

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const {db,response} = require("./app/models");
const Role = db.role;
var mongoDB = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
db.mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var status_db = db.mongoose.connection.readyState
if (status_db ==2){
  initial();
  console.log("Successfully connect to MongoDB.");
}
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome Xblocks Development." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}