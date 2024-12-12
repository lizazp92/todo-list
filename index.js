const mainSection = document.querySelector(".main-section");
const addBtn = document.getElementById("btnAddTask");
const input = document.getElementById("inputAddTask");
const list = document.getElementById("listTasks");

addBtn.addEventListener("click", () => {
  const newTask = input.value.trim();

  if (newTask != "") {
    const item = createTask(newTask);
    list.appendChild(item);

    input.value = "";
    input.placeholder = "Enter new task";

    createClearBtn();

    toggleHr(true);
  }
});

function createTask(newTask) {
  const item = document.createElement("li");
  item.className = "input-group mb-3";

  const taskContainer = document.createElement("div");
  taskContainer.className = "input-group-container";

  const liContainer = document.createElement("div");

  const taskText = createListItemEl("span", "task-text", newTask);
  const doneBtn = createDoneBtn(taskText, item);
  const removeBtn = createRemoveBtn(item);
  const importantBtn = createImportantBtn(item);

  taskContainer.appendChild(doneBtn);
  taskContainer.appendChild(importantBtn);
  taskContainer.appendChild(taskText);

  liContainer.appendChild(taskContainer);
  liContainer.classList = "liContainer";
  liContainer.appendChild(removeBtn);

  item.appendChild(liContainer);

  return item;
}

function createDoneBtn(taskText, item) {
  const doneBtn = createListItemCheckbox(
    "form-check-input task-btn shadow-none"
  );

  doneBtn.addEventListener("click", () => {
    const alertRemoveText = item.querySelector(".alert-text");

    if (alertRemoveText) {
      alertRemoveText.remove();
    }
    taskText.classList.toggle("finished");
    item.classList.toggle("marked-finished");
  });

  return doneBtn;
}

function createRemoveBtn(item) {
  const removeBtn = document.createElement("button");
  removeBtn.classList = "remove task-btn";

  const removeBtnIcon = document.createElement("i");
  removeBtnIcon.classList = "fa-regular fa-trash-can";

  removeBtn.appendChild(removeBtnIcon);

  const taskItems = document.querySelectorAll("li");

  removeBtn.addEventListener("click", () => {
    if (item.classList.contains("marked-finished")) {
      item.remove();
      createClearBtn();

      if (taskItems.length === 0) {
        toggleHr(false);
      }
    } else if (!item.querySelector(".alert-text")) {
      const alertRemoveBtn = createListItemEl(
        "span",
        "alert-text",
        "The task was not marked as done"
      );

      item.appendChild(alertRemoveBtn);
    }
  });
  return removeBtn;
}

function createImportantBtn(item) {
  const importantBtn = document.createElement("button");
  importantBtn.classList = "important task-btn";

  const importantBtnIcon = document.createElement("i");
  importantBtnIcon.classList = "fa-regular fa-star";

  importantBtn.appendChild(importantBtnIcon);

  importantBtn.addEventListener("click", () => {
    if (importantBtnIcon.classList.contains("fa-regular")) {
      importantBtnIcon.classList.replace("fa-regular", "fa-solid");

      item.classList.add("importantTask");
    } else {
      importantBtnIcon.classList.replace("fa-solid", "fa-regular");
      item.classList.remove("importantTask");
    }
  });

  return importantBtn;
}

function createClearBtn() {
  const listItems = list.querySelectorAll("li");
  const clearBtn = mainSection.querySelector(".btn-clear");

  if (listItems.length > 0) {
    if (!clearBtn) {
      const clearTasks = createListItemEl(
        "button",
        "btn btn-secondary btn-clear",
        "Clear all tasks"
      );
      mainSection.appendChild(clearTasks);

      clearTasks.addEventListener("click", () => {
        list.innerHTML = "";
        createClearBtn();
        toggleHr(false);
      });
    }
  } else {
    if (clearBtn) {
      clearBtn.remove();
    }
  }
}

function createListItemEl(tagName, tagClass, tagValue) {
  const el = document.createElement(tagName);
  el.className = tagClass;
  el.textContent = tagValue;

  return el;
}

function createListItemCheckbox(inputClass) {
  const el = document.createElement("input");
  el.className = inputClass;
  el.type = "checkbox";

  return el;
}

function toggleHr(show) {
  document.querySelectorAll("hr").forEach((hr) => {
    hr.classList.toggle("d-none", !show);
  });
}
