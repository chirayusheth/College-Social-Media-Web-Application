const router = require("express").Router();
const bcrypt = require("bcryptjs");
let User = require("../models/User.model");
let ClubCom = require("../models/ClubCom.model");
const passport = require("passport");

router.route("/").get(async (req, res) => {
  await User.find()
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/register").post((req, res) => {
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);
  const Email_ID = req.body.Email_ID;
  const Name = req.body.Name;
  const Contact = req.body.Contact;
  const Gender = req.body.Gender;
  const Age = req.body.Age;
  const Address = req.body.Address;
  const Clg_ID = req.body.Clg_ID;
  const UserType = "student";

  const newUser = new User({
    username,
    password,
    Email_ID,
    Name,
    Contact,
    Gender,
    Age,
    Address,
    Clg_ID,
    UserType,
  });
  User.findOne({ username: username }).then((user) => {
    if (user != null) {
      res.status(400).json("User already exists");
    } else {
      newUser
        .save()
        .then(() => res.json("User added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

router.route("/isLoggedIn").get((req, res, next) => {
  //console.log('===== user!!======')
  //	console.log(req.user)
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

/* 
router.route('/login').post(async (req, res) => {
	await ClubCom.findOne({ username: req.body.username })
		.then(ClubCom => {
			if (ClubCom == null) {
				User.findOne({ username: req.body.username })
					.then(user => {
						if (user == null) {
							return res.status(400).json('username does not exist');
						}
						else if (!bcrypt.compareSync(req.body.password, user.password)) {
							return res.status(400).json('Message: The password is invalid');
						}
						else {
							res.json('Login Succesful for id' + user._id);
						}
					})
					.catch(err => res.status(400).json('Error: ' + err));
			}
			else if (!bcrypt.compareSync(req.body.password, ClubCom.password)) {
				return res.status(400).json('Message: The password is invalid');
			}
			else {
				res.json('Login Succesful for id' + ClubCom._id);
			}
		})
		.catch(err => res.status(400).json('Error' + err));

});
*/

router.route("/login").post(async (req, res, next) => {
  passport.authenticate("local", (err, user, errors) => {
    if (err) {
      return next(user);
    }
    if (!user) {
      return res.status(400).json(errors.msg);
    } else {
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        } else {
          req.session.save(() => {
            res.json(user);
          });
        }
      });
    }
  })(req, res, next);
});

router.route("/logout").post((req, res) => {
  if (req.user) {
    req.logOut();
    req.session.destroy();
    res.json("Message: Logged Out");
  } else {
    res.json("No user to log out.");
  }
});

router.route("/:id").get(async (req, res) => {
  await User.findById(req.params.id)
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete(async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post(async (req, res) => {
  await User.findById(req.params.id)
    .then((User) => {
      User.username = req.body.username;
      //User.password = Bcrypt.hashSync(req.body.password, 10);
      User.Email_ID = req.body.Email_ID;
      User.Name = req.body.Name;
      User.Contact = req.body.Contact;
      User.Gender = req.body.Gender;
      User.Age = req.body.Age;
      User.Address = req.body.Address;
      User.Clg_ID = req.body.Clg_ID;
      User.UserType = "student";
      User.save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//change password: provide old passwordas well with new password
// router.route("/changepassword/:id").post(async (req, res) => {
//   await User.findById(req.params.id)
//     .then((User) => {
//       if (!bcrypt.compareSync(req.body.Oldpassword, User.password)) {
//         return res.status(400).json("Message: The password is invalid");
//       }
//       User.password = bcrypt.hashSync(req.body.Newpassword, 10);

//       User.save()
//         .then(() => res.json("User updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });


router.route("/changepassword/:id").post(async (req, res) => {
  await ClubCom.findById(req.params.id)
    .then((ClubCom) => {
      if (ClubCom == null) {
        User.findById(req.params.id)
          .then((User) => {
            if (!bcrypt.compareSync(req.body.Oldpassword, User.password)) {
              return res.status(400).json("Message: The password is invalid");
            }
            User.password = bcrypt.hashSync(req.body.Newpassword, 10);

            User.save()
              .then(() => res.json("User updated!"))
              .catch((err) => res.status(400).json("Error: " + err));
          })
          .catch((err) => res.status(400).json("Error: " + err));
      }
      else {
        if (!bcrypt.compareSync(req.body.Oldpassword, ClubCom.password)) {
          return res.status(400).json("Message: The password is invalid");
        }
        ClubCom.password = bcrypt.hashSync(req.body.Newpassword, 10);

        ClubCom.save()
          .then(() => res.json("User updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      }

    })
    .catch((err) => res.status(400).json("Error: " + err))
});

module.exports = router;
