let userIdToEdit = "";

function resetForm() {
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  console.log("userDetails", userDetails)

  if (userIdToEdit) {
    axios
      .put(
        `https://crudcrud.com/api/13fb93b180ff48e495331504ca3031d6/todo/${userIdToEdit}`,
        userDetails
      )
      .then((response) => {
        userIdToEdit = "";
        resetForm();
        getUsers();
      })
      .catch((error) => console.log(error));
  } else {
    axios
      .post(
        "https://crudcrud.com/api/13fb93b180ff48e495331504ca3031d6/todo",
        userDetails
      )
      .then((response) => getUsers())
      .catch((error) => console.log(error));
  }


  // Clearing the input fields
  resetForm();
}
window.addEventListener("DOMContentLoaded", () => {
  getUsers();
});

function getUsers() {


  axios
    .get(
      "https://crudcrud.com/api/13fb93b180ff48e495331504ca3031d6/todo"
    )
    .then((response) => {
      const userList = document.querySelector("ul");
      userList.innerHTML = "";
      response.data.forEach((userDetails) => {
        displayUserOnScreen(userDetails);
      });
    })
    .catch((error) => console.log(error));

}

function displayUserOnScreen(userDetails) {

  const userId = userDetails["_id"]
  const userItem = document.createElement("li");
  userItem.setAttribute("id", userId);
  userItem.dataset.username = userDetails.username;
  userItem.dataset.email = userDetails.email;
  userItem.dataset.phone = userDetails.phone;
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username}-${userDetails.email}-${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    const liElement = event.target.parentElement;
    const userId = liElement.getAttribute('id');
    axios
      .delete(

        `https://crudcrud.com/api/13fb93b180ff48e495331504ca3031d6/todo/${userId}`
      )
      .then(() => {
        getUsers();
      })
      .catch((error) => console.log(error));
  });

  editBtn.addEventListener("click", function (event) {
    const liElement = event.target.parentElement;
    userIdToEdit = liElement.getAttribute("id");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phoneno = document.getElementById("phone");
    username.value = liElement.dataset.username || "";
    email.value = liElement.dataset.email || "";
    phoneno.value = liElement.dataset.phone || "";
  })
}
