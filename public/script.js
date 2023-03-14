const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// axiosで/api/v1/tasksからタスクを読み込む
const showTasks = async () => {
  try {
    // 自作のAPIを叩く
    const { data: tasks } = await axios.get("/api/v1/tasks");

    // タスクがひとつもない時のメッセージ
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありまチェン</h5>`;
      return;
    }

    // タスクを出力
    const alltasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;

        return `<div class="single-task">
          <h5>
            <span><i class="far fa-check-circle"></i></span>${name}
          </h5>
          <div class="task-links">
            <a href="#" class="edit-link"><i class="fas fa-edit"></i></a>
            <button type="button" class="delete-btn" data-id="${_id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;
      })
      .join("");
    tasksDOM.innerHTML = alltasks;
  } catch (err) {
    console.log(err);
  }
};
showTasks();

// タスクを新規作成する
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;
  formAlertDOM.style.display = "block";
  formAlertDOM.textContent = "タスク追加ああ！！";
  formAlertDOM.classList.add("text-success");
  try {
    //nameをpost（作成する！）↓
    await axios.post("/api/v1/tasks", { name: name });
    showTasks();
    taskInputDOM.value = "";
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    formAlertDOM.classList.remove("text-success");
    formAlertDOM.innerHTML = "20文字以上は無効です。もう一度お願いします";
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
  }, 3000);
});

// タスクを削除する
tasksDOM.addEventListener("click", async (e) => {
  const element = e.target;
  // もし親要素のクラスにdelete-btnが含んでいたらの条件分岐
  if (element.parentElement.classList.contains("delete-btn")) {
    // 削除する
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
