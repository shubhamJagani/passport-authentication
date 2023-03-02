require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");
const path = require("path");
const session = require("express-session");
const MongooseStore = require("connect-mongo");
const flash = require("connect-flash");


//passport auth
const passport = require("passport");

require("./config/passport")(passport);

// ...
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

let mongooseStore = MongooseStore.create({
  mongoUrl: process.env.MONGO_URL,
  ttl: 1000 * 60 * 7,
  crypto: {
    secret: process.env.SECRET,
  },
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    store: mongooseStore,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(flash());

//passport auth

app.use(passport.initialize());
app.use(passport.session());

//...

app.use(routes);

app.listen(port, () => {
  console.log(`server started on  http://localhost:${port}`);
});
