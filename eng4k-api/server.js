const express = require("express");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

const nurseRouter = require("./routes/routes_nurse");
const loginRouter = require("./routes/routes_login");

const pool = require("./dbPool.js");

const app = express();

// session id from this documentation https://www.npmjs.com/package/express-session
const FifteenMinutes = 1000 * 60 * 15;
const {
  PORT = 3001,
  NODE_ENV = "development",
  SESSION_NAME = "sid",
  SESSION_SECRET = "somethingsecrethere!",
  SESSION_LIFETIME = FifteenMinutes,
} = process.env;

const IN_PROD = NODE_ENV === "production";

app.use(express.json());

app.use(
  session({
    name: SESSION_NAME,
    resave: false, //every request for the server make sure you dont create a new session if its not new
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: new MySQLStore({}, pool),
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

app.get("/", (req, res) => {
  req.session.init = "init";
  console.log(req.session);
  res.send("hello");
});

app.use("/nurse", nurseRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
