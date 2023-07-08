const mongoose = require("mongoose");
const url = "mongodb+srv://kawish:carcar11@cluster0.zc1ertc.mongodb.net/";
const connectDatabase = async () => {
  let db = false
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb is connect to ${data.connection.host}`);
      db = true;
      return db;

    }).catch((err) => {
      db = false;
      return db;
    });

};
module.exports = connectDatabase;
