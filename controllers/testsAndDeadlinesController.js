const db = require("../models");

const TestsAndDeadlines = db.testsanddeadlines;

const addTestOrDeadline = async (req, res) => {
  TestsAndDeadlines.create({
    module: req.body.module,
    type: req.body.type,
    date: req.body.date,
    time: req.body.time,
    createdBy: req.body.username,
  })
    .then((done) => {
      res.status(200).send("added notification for your deadline/test");
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occurred");
    });
};

const deleteTestOrDeadline = async (req, res) => {
  TestsAndDeadlines.destroy({
    where: {
      id: req.body.id,
      createdBy: req.body.username,
    },
  })
    .then((done) => {
      res.status(200).send("deleted notification for your deadline/test");
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occurred");
    });
};

const getTestsAndDeadlines = async (req, res) => {
  TestsAndDeadlines.findAll()
    .then((results) => {
      let arr = [];
      results.forEach((r) => {
        arr.push([r.module, r.type, r.date, r.time]);
      });
      res.status(200).send(arr);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("Error occurred");
    });
};

module.exports = {
  addTestOrDeadline,
  deleteTestOrDeadline,
  getTestsAndDeadlines,
};
