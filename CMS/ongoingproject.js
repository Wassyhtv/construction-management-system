document
  .getElementById("resource-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("resource-name").value;
    const type = document.getElementById("resource-type").value;
    const quantity = document.getElementById("quantity").value;
    const cost = document.getElementById("cost").value;
    const notes = document.getElementById("notes").value;

    const tableBody = document.getElementById("resource-table-body");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${name}</td>
      <td>${type}</td>
      <td>${quantity}</td>
      <td>${cost}</td>
      <td>${notes}</td>
      <td><button onclick="deleteRow(this)">Delete</button></td>
  `;

    tableBody.appendChild(row);
    this.reset();
  });

function deleteRow(button) {
  button.parentElement.parentElement.remove();
}

function uploadDocument() {
  const fileInput = document.getElementById("file-upload");
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    const listItem = document.createElement("li");
    listItem.textContent = fileName;
    document.getElementById("uploaded-files").appendChild(listItem);
    fileInput.value = "";
  }
}

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const task = document.getElementById("task-name").value;
    const assignedTo = document.getElementById("assigned-to").value;
    const dueDate = document.getElementById("due-date").value;
    const status = document.getElementById("status").value;

    const tableBody = document.getElementById("task-table-body");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task}</td>
      <td>${assignedTo}</td>
      <td>${dueDate}</td>
      <td>${status}</td>
      <td><button onclick="deleteRow(this)">Delete</button></td>
  `;

    tableBody.appendChild(row);
    this.reset();
  });
