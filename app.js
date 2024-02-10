const title = document.getElementById("title");
const priority = document.getElementById("priority");
const btn = document.getElementById("btn");
const list = document.querySelector(".list");

window.addEventListener("load", () => {
  const storedItems = JSON.parse(localStorage.getItem("listItems")) || [];
  storedItems.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    listItem.innerHTML = `<div>
                          <h3 class="title">${item.title}</h3>
                          <span class="priority">${item.priority}</span>
                          </div>
                          <div class="list-icons">
                          <span><i class="fa-solid fa-pencil list-icon" id="edit"></i></span>
                          <span><i class="fa-regular fa-trash-can list-icon" id="trash"></i></span>
                          </div>`;
    list.appendChild(listItem);
  });
});

btn.addEventListener("click", () => {
  if (title.value || priority.value) {
    const listItem = document.createElement("div");
    listItem.innerHTML = `<div>
                        <h3 class="title">${title.value}</h3>
                         <span class="priority">${priority.value}</span>
                         </div>
                         <div class="list-icons">
                         <span><i class="fa-solid fa-pencil list-icon" id="edit"></i></span>
                         <span><i class="fa-regular fa-trash-can list-icon" id="trash"></i></span>
                         </div>`;

    listItem.classList.add("list-item");
    list.append(listItem);

    const storedItems = JSON.parse(localStorage.getItem("listItems")) || [];
    storedItems.push({ title: title.value, priority: priority.value });
    localStorage.setItem("listItems", JSON.stringify(storedItems));

    title.value = "";
    priority.value = "";
  } else {
    alert("Write all information");
  }

  const editButtons = document.querySelectorAll(".list-icon#edit");
  const trashButtons = document.querySelectorAll(".list-icon#trash");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", () => {
      const listItem = editButton.closest(".list-item");
      const newTitle = prompt("Enter new title:");
      const newPriority = prompt("Enter new priority:");

      if (newTitle !== null && newTitle.trim() !== "") {
        listItem.querySelector(".title").textContent = newTitle;
      }

      if (newPriority !== null && newPriority.trim() !== "") {
        listItem.querySelector(".priority").textContent = newPriority;
      }
    });
  });

  trashButtons.forEach((trashButton) => {
    trashButton.addEventListener("click", () => {
      const listItem = trashButton.closest(".list-item");
      listItem.remove();
    });
  });
});
