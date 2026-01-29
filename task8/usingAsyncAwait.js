let userIdToEdit = "";

async function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  try {
    if (userIdToEdit) {
      // UPDATE USER
      await axios.put(
        `https://crudcrud.com/api/1a4a9cc4f8cb497d93205dd977d2e446/todo/${userIdToEdit}`,
        userDetails
      );

      userIdToEdit = "";
    } else {
      // CREATE USER
      await axios.post(
        "https://crudcrud.com/api/1a4a9cc4f8cb497d93205dd977d2e446/todo",
        userDetails
      );
    }

    // Clear input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    await getUsers();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getUsers();
});

async function getUsers() {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/1a4a9cc4f8cb497d93205dd977d2e446/todo"
    );

    const liElements = document.querySelectorAll("li");
    liElements.forEach((li) => li.remove());

    response.data.forEach((userDetails) => {
      displayUserOnScreen(userDetails);
    });
  } catch (error) {
    console.log(error);
  }
}

function displayUserOnScreen(userDetails) {
  const userId = userDetails["_id"];

  const userItem = document.createElement("li");
  userItem.setAttribute("id", userId);
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username}-${userDetails.email}-${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  userItem.appendChild(deleteBtn);
  userItem.appendChild(editBtn);

  document.querySelector("ul").appendChild(userItem);

  deleteBtn.addEventListener("click", async () => {
    try {
      await axios.delete(
        `https://crudcrud.com/api/1a4a9cc4f8cb497d93205dd977d2e446/todo/${userId}`
      );
      await getUsers();
    } catch (error) {
      console.log(error);
    }
  });

  editBtn.addEventListener("click", () => {
    const values = userItem.firstChild.textContent.split("-");

    userIdToEdit = userId;

    document.getElementById("username").value = values[0];
    document.getElementById("email").value = values[1];
    document.getElementById("phone").value = values[2];
  });
}