var db = require("../models");

module.exports = function (app) {
  app.get("/api/burger", function (req, res) {
    db.Burger.findAll({}).then(function (dbBurger) {
      res.json(dbBurger);
    });
  });

  app.post("/api/burger", function (req, res) {
    db.Burger.create(req.body).then(function (dbBurger) {
      res.json(dbBurger);
    });
  });

  app.put("/api/burger", function (req, res) {
    console.log(req.body.id);
    console.log(req.body);
    db.Burger.update({
      devoured: true,
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (dbBurger) {
        res.json(dbBurger);
      });
  });

};
