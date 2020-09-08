const router = require("express").Router();
let ClubCom = require("../models/ClubCom.model");
const bcrypt = require("bcryptjs");

router.route("/").get((req, res) => {
  ClubCom.find()
    .then((clubcom) => res.json(clubcom))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/register").post((req, res) => {
  const username = req.body.username;
  const password = bcrypt.hashSync(String(req.body.password), 10);
  const Email_ID = req.body.Email_ID;
  const Contact = req.body.Contact;
  const Clg_ID = req.body.Clg_ID;
  const UserType = "ClubCom";

  const newClubCom = new ClubCom({
    username,
    password,
    Email_ID,
    Contact,
    Clg_ID,
    UserType,
  });

  ClubCom.findOne({ username: username })
    .then((clubcom) => {
      if (clubcom != null) {
        res.status(400).json("Club/Com already exists");
      } else {
        console.log(newClubCom);
        newClubCom
          .save()
          .then(() => res.json("ClubCom added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  ClubCom.findById(req.params.id)
    .then((ClubCom) => res.json(ClubCom))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  ClubCom.findByIdAndDelete(req.params.id)
    .then(() => res.json("ClubCom deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  ClubCom.findById(req.params.id)
    .then((ClubCom) => {
      ClubCom.Name = req.body.Name;
      ClubCom.Contact = Number(req.body.Contact);
      ClubCom.Clg_ID = Number(req.body.Clg_ID);
      ClubCom.Email_ID = req.body.Email_ID;
      ClubCom.UserType = "ClubCom";

      ClubCom.save()
        .then(() => res.json("ClubCom updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
