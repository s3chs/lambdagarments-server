// ENV VARIABLES
require("dotenv").config();
// DATABASE CONNECTION
require("./config/mongodb");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

var app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // Stores the session in the Database, if the server crashes / restarts, session is preserved.
    secret: process.env.SESSION_SECRET, // Cookie encryption secret.
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    cookie: { secure: process.env.NODE_ENV === "production" ? true : false },
  })
); // Establishes a session between client & server (via cookie)

// if (process.env.NODE_ENV !== "production") {
//   app.use(function (req, res, next) {
//     req.session.currentUser = "";
//     next();
//   });
// }

//ROUTER
app.use("/clothes", require("./routes/clothes"));
app.use("/api/auth", require("./routes/auth"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

module.exports = app;
