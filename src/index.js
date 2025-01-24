const express = require("express");
const connect = require("./config/db");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ORIGIN } = require("./config/serverConfig");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server started at port: ${PORT}`);
  await connect();
  console.log("MongoDB connected");
});
