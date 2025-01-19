const express = require("express");
const connect = require("./config/db");
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Server started at port: ${PORT}`);
  await connect();
  console.log("MongoDB connected");
});
