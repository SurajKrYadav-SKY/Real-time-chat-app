const mongoose = require("mongoose");
const { MONGO_DB } = require("./serverConfig");

const connect = async () => {
  await mongoose.connect(MONGO_DB);
};

module.exports = connect;
