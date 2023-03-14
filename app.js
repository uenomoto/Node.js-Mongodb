const express = require("express");
const app = express();
const taskRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
// .envファイルを読み込む
require("dotenv").config();

// ↓この記述がないとexpressでjsonが使えない。忘れずに！
app.use(express.json());
// ↓この記述でHTMLファイル（静的サイト）を探してきてくれる！
app.use(express.static("./public"));

const PORT = 5000;

// ルーティング設計　共通する部分を入れて異なる部分はtaskRouterに入れるよってtasks.jsをいじる
app.use("/api/v1/tasks", taskRouter);

// データベースと接続 モンゴdbから取得したurlを記述 非同期処理で記述
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log("サーバーが起動したよ！"));
  } catch (err) {
    console.log(err);
  }
};

start();
