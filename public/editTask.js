const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;
// idのパラメーターだけ取得
const id = new URLSearchParams(params).get("id");
console.log(id);

// 一つの特定のタスクを取得
const showTask = async () => {
  try {
    // 分割代入でdataだけ取得
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, name } = task;
    // id表示
    taskIdDOM.textContent = _id;
    // インプットのvalueを表示
    taskNameDOM.value = name;

    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};

showTask();

// タスクの編集

editFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    taskCompleted = taskCompletedDOM.checked;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集に成功しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
