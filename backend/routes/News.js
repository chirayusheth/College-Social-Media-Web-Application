const router = require("express").Router();
let News = require("../models/News.model");

router.route("/").get((req, res) => {
  News.find()
    .then((News) => res.json(News))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const Title = req.body.Title;
  const Date = req.body.Date;
  const Description = req.body.Description;

  const newNews = new News({
    Title,
    Date,
    Description,
  });

  newNews
    .save()
    .then(() => res.json("News added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  News.findById(req.params.id)
    .then((News) => res.json(News))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.json("News deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  News.findById(req.params.id)
    .then((News) => {
      News.Title = req.body.Title;
      News.Date_time = Date.parse(req.body.Date_time);
      News.Description = Description;

      News.save()
        .then(() => res.json("News updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
