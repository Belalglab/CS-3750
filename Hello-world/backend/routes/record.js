const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn.js");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
recordRoutes.route("/record/add").post(async (req, res) => {
    try {
      let db_connect = dbo.getDb();
      let myobj = {
        name: req.body.name
      };
  
      let query = {name: req.body.name}
      const results = db_connect.collection("records").insertOne(myobj);
      res.json(results);
    } catch (err) {
      throw err;
    }
  });


  recordRoutes.route("/record").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb("users");
        const result = await db_connect.collection("records").find({}).project({password: 0}).toArray();
        res.json(result);
    } catch (err) {
        throw err;
    }
  });

module.exports = recordRoutes;