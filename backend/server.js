const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
//const bcrypt = require('bcryptjs');
//let User = require('../backend/models/User.model')
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

var whitelist = ["http://localhost:3000", "http://localhost:5000"];
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

const passport = require("passport");
const setupPassport = require("./auth/passport");
//const checkAuthenticated = require('./auth/protect')
const port = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  dbName: "test",
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`MongoDB database connection established successfully`);
});

// app.use((req,res,next()) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Header", "*");
//   )
// })
// // app.get("/User/isLoggedIn", function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for all origins!" });
// });

// app.listen(80, function () {
//   console.log("CORS-enabled web server listening on port 80");
// });

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: connection }),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
setupPassport(passport);

const eventRouter = require("./routes/Event");
const ClubComRouter = require("./routes/ClubCom");
const ComplaintRouter = require("./routes/Complaint");
const CompanyRouter = require("./routes/Company");
const CProfileRouter = require("./routes/CProfile");
const NewsRouter = require("./routes/News");
const CommentRouter = require("./routes/Comment");
const UserRouter = require("./routes/User");

app.use("/Event", eventRouter);
app.use("/ClubCom", ClubComRouter);
app.use("/Complaint", ComplaintRouter);
app.use("/Company", CompanyRouter);
app.use("/CProfile", CProfileRouter);
app.use("/News", NewsRouter);
app.use("/Comment", CommentRouter);
app.use("/User", UserRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
