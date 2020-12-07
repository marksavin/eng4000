const express = require("express");
const nurseRouter = require("./routes/index_nurse");

const app = express();

app.use(express.json());

app.use("/nurse", nurseRouter);

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
