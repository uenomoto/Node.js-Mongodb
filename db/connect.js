// Node.jsとMongodbをマングースを使って連携させる

const mongoose = require("mongoose");
// urlはモンゴDBから取得したやつ
const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("DBと接続中。。。。"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
