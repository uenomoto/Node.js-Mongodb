// タスクのモデル

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    // NOT NULLと同じ役割空白禁止バリデーションtrimとセット
    require: [true, "タスク名を入力してください"],
    trim: true,
    maxlength: [20, "タスク名は最大２０文字まで！"],
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
