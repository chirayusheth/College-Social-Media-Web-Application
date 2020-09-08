const router = require("express").Router();
let Event = require("../models/Event.model");
let ClubCom = require("../models/ClubCom.model");

router.route("/").get((req, res) => {
  Event.find({ Approved: true })
    .then((Event) => res.json(Event))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/filterBy/:Organizer").get((req, res) => {
  ClubCom.findOne({ username: req.params.Organizer }, { _id: 1 })
    .then((clubcom) => {
      Event.find({ Organizer: clubcom._id, Approved: true })
        .then((Event) => res.json(Event))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//get all events of a club com
router.route("/getallEvents/:Organizer").get((req, res) => {
  ClubCom.findOne({ username: req.params.Organizer }, { _id: 1 })
    .then((clubcom) => {
      Event.find({ Organizer: clubcom._id })
        .then((Event) => res.json(Event))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/Pending").get((req, res) => {
  Event.find({ Approved: false })
    .then((Event) => res.json(Event))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const Name = req.body.Name;
  let Organizer;
  const Contact = req.body.Contact;
  const Date = req.body.Date;
  const Time = req.body.Time;
  const Venue = req.body.Venue;
  const Duration = req.body.Duration;
  const Description = req.body.Description;
  const NoOfAttendees = 0;
  const Approved = false;

  var query = ClubCom.findOne(
    { username: String(req.body.Organizer) },
    { _id: 1 }
  );
  query.exec(function (err, clubcom) {
    if (err) return console.log(err);

    Organizer = clubcom._id;

    const newEvent = new Event({
      Name,
      Organizer,
      Contact,
      Date,
      Time,
      Venue,
      Duration,
      Description,
      NoOfAttendees,
      Approved,
    });

    newEvent
      .save()
      .then(() => res.json("Event added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route("/rsvp/:id").post((req, res) => {
  Event.findById(req.params.id).then((event) => {
    event.NoOfAttendees = event.NoOfAttendees + 1;
    event
      .save()
      .then(() => res.json("RSVP sucessful!"))
      .catch((err) => res.status(400).json("Error : " + err));
  });
});

router.route("/rsvpcancel/:id").post((req, res) => {
  Event.findById(req.params.id).then((event) => {
    event.NoOfAttendees = event.NoOfAttendees - 1;
    event
      .save()
      .then(() => res.json("RSVP cancelled!"))
      .catch((err) => res.status(400).json("Error : " + err));
  });
});

router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((Event) => res.json(Event))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("Event deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Event.findById(req.params.id)
    .then((Event) => {
      Event.Name = req.body.Name;
      Event.Contact = Number(req.body.Contact);
      Event.Date_time = Date.parse(req.body.Data_time);
      Event.Venue = req.body.Venue;
      Event.Duration = Number(req.body.Duration);
      Event.Description = req.body.Description;
      //	Event.NoOfAttendees = Number(req.body.NoOfAttendees);
      Event.Approved = false;

      var query = ClubCom.findOne(
        { username: String(req.body.Organizer) },
        { _id: 1 }
      );
      query.exec(function (err, clubcom) {
        if (err) return console.log(err);

        Event.Organizer = clubcom._id;

        Event.save()
          .then(() => res.json("Event updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/approve/:id").post((req, res) => {
  Event.findById(req.params.id).then((event) => {
    event.Approved = true;
    event
      .save()
      .then(() => res.json("Event approved!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
