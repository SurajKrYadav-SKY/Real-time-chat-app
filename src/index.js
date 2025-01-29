const express = require("express");
const connect = require("./config/db");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ORIGIN, PROFILE_UPLOAD_DIR } = require("./config/serverConfig");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(`${PROFILE_UPLOAD_DIR}`, express.static(PROFILE_UPLOAD_DIR));

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server started at port: ${PORT}`);
  await connect();
  console.log("MongoDB connected");
});
