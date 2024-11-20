import { v4 as uuidv4 } from "uuid";
import { deleteStorageTask, saveStorageTask } from "./storage";

export const TASK_TITLE = "task";

export const allItems = JSON.parse(localStorage.getItem(TASK_TITLE)) ?? [];

document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("saveTaskButton");

  const todo = document.getElementById("todo");
  const progress = document.getElementById("progress");
  const done = document.getElementById("done");

  dialog.addEventListener("click", () => {
    const input = document.getElementById("taskInput");

    saveStorageTask({ id: uuidv4(), title: input.value, status: "todo" });

    render();
  });

  const render = () => {
    allItems.forEach((item) => {
      const el = document.createElement("div");
      el.className = "todo__column-card";
      el.innerHTML = `
                <div>                
                  <select class="status-select">
                    <option value="todo" ${
                      item.status === "todo" ? "selected" : ""
                    }>Todo</option>
                    <option value="progress" ${
                      item.status === "progress" ? "selected" : ""
                    }>In Progress</option>
                    <option value="done" ${
                      item.status === "done" ? "selected" : ""
                    }>Done</option>
                  </select>
                  <input class="todo__column-card-title" type="text" value="${
                    item.title
                  }" />
                </div>
                <div>
                  <button class="edit-button">Изменить</button>
                  <button class="delete-button" data-id="${
                    item.id
                  }">Удалить</button>
                </div>
            `;

      const editButton = el.querySelector(".edit-button");
      const inputField = el.querySelector("input");
      const statusSelect = el.querySelector(".status-select");

      editButton.addEventListener("click", () => {
        const newTitle = inputField.value;
        const newStatus = statusSelect.value;
        const updatedItem = { ...item, title: newTitle, status: newStatus };
        const index = allItems.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          allItems[index] = updatedItem;
          localStorage.setItem(TASK_TITLE, JSON.stringify(allItems));
          render();
        }
      });

      const deleteButton = el.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        deleteStorageTask(item.id);
        render();
      });

      if (item.status === "todo") {
        todo.appendChild(el);
      } else if (item.status === "progress") {
        progress.appendChild(el);
      } else if (item.status === "done") {
        done.appendChild(el);
      }
    });
  };

  render();
});
