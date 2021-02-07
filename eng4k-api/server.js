const express = require("express");

const nurseRouter = require("./routes/routes_nurse");
const loginRouter = require("./routes/routes_login");

const app = express();

app.use(express.json());

app.use("/nurse", nurseRouter);
app.use("/login", loginRouter);

app.listen(3001, () => {
  console.log(`Server listening on port 3001`);
});
