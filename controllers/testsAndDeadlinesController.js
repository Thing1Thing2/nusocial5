const db = require("../models");
var giphy = require("giphy-wrapper")("    4LNVpKcyYsZK9sTvTBxYQiTToKf9TIsz");

var textJob = new cronJob("0 18 * * *", function () {
  giphy.search("puppy", 10, 0, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    var gifs = data.data;
    var gif = gifs[Math.floor(Math.random() * gifs.length)];
    console.log(gif);
  });
});

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
