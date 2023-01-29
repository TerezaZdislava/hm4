const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the databasee
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

recordRoutes.route('/record').get(async function (req, res) {
  let db_connect = dbo.getDb();
  let diet = req.query.diet;
  let numberOfMeals = req.query.numberOfMeals;
  let menu = {};

  let breakfast = await db_connect
    .collection('meals')
    .aggregate([
      { $match: { type: { $in: ['breakfast'] } } },
      { $match: { diets: { $in: [diet] } } },
      { $sample: { size: 1 } },
    ])
    .toArray();
  menu.breakfast = breakfast[0];

  if (numberOfMeals == 5) {
    let snack = await db_connect
      .collection('meals')
      .aggregate([
        { $match: { type: { $in: ['snack'] } } },
        { $match: { diets: { $in: [diet] } } },
        { $sample: { size: 1 } },
      ])
      .toArray();
    menu.snack = snack[0];
  }

  let lunch = await db_connect
    .collection('meals')
    .aggregate([
      { $match: { type: { $in: ['lunch'] } } },
      { $match: { diets: { $in: [diet] } } },
      { $sample: { size: 1 } },
    ])
    .toArray();
  menu.lunch = lunch[0];

  if (numberOfMeals == 5) {
    let snack2 = await db_connect
      .collection('meals')
      .aggregate([
        { $match: { type: { $in: ['snack'] } } },
        { $match: { diets: { $in: [diet] } } },
        { $sample: { size: 1 } },
      ])
      .toArray();
    menu.snack2 = snack2[0];
  }

  let dinner = await db_connect
    .collection('meals')
    .aggregate([
      { $match: { type: { $in: ['dinner'] } } },
      { $match: { diets: { $in: [diet] } } },
      { $sample: { size: 1 } },
    ])
    .toArray();
  menu.dinner = dinner[0];

  // for (const element of trijidla) {
  //   let meal = element;
  //   let xxx = await db_connect
  //     .collection('meals')
  //     .aggregate([
  //       { $match: { type: { $in: [element] } } },
  //       { $match: { diets: { $in: [diet] } } },
  //       { $sample: { size: 1 } },
  //     ])
  //     .toArray();
  //   console.log('meal ' + meal);
  //   menu.meal = xxx[0];
  // }
  console.log(numberOfMeals, diet);
  console.log('snidane ' + JSON.stringify(menu.breakfast));
  // console.log('snack ' + JSON.stringify(menu.breakfast));
  // console.log('snidane ' + JSON.stringify(menu.breakfast));
  // console.log('snack2 ' + JSON.stringify(menu.snack2));
  // console.log('dinner ' + JSON.stringify(menu.dinner));
  // console.log('aaa ' + JSON.stringify(test));
  res.json(menu);
});

// // This section will help you get a single record by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect
//    .collection("records")
//    .findOne(myquery, function (err, result) {
//      if (err) throw err;
//      res.json(result);
//    });
// });

// // This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myobj = {
//    name: req.body.name,
//    position: req.body.position,
//    level: req.body.level,
//  };
//  db_connect.collection("records").insertOne(myobj, function (err, res) {
//    if (err) throw err;
//    response.json(res);
//  });
// });

// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      position: req.body.position,
//      level: req.body.level,
//    },
//  };
//  db_connect
//    .collection("records")
//    .updateOne(myquery, newvalues, function (err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      response.json(res);
//    });
// });

// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });

module.exports = recordRoutes;
