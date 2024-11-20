const dialog = document.getElementById("addTaskDialog");

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
