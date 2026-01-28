let userIdToEdit="";
function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  console.log("userDetails", userDetails)
  
  if(userIdToEdit){
     axios
    .put(
      `https://crudcrud.com/api/1a4a9cc4f8cb497d93205dd977d2e446/todo/${userIdToEdit}`,
      userDetails
    )
    .then((response) => {
      userIdToEdit="";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      getUsers();
    })
    .catch((error) => console.log(error));
  } else {
     axios
    .post(
      "https://crudcrud.com/api/1a4a9cc4f8cb497d93205dd977d2e446/todo",
      userDetails
    )
    .then((response) => getUsers())
    .catch((error) => console.log(error));
  }
 

  // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}
window.addEventListener("DOMContentLoaded", () => {
 getUsers();
});

function getUsers() {
  
  
   axios
    .get(
      "https://crudcrud.com/api/1a4a9cc4f8cb497d93205dd977d2e446/todo"
    )
    .then((response) => {
      const liElements = document.querySelectorAll('li'); 
      liElements.forEach((li)=>{
            li.remove();
      })
      response.data.forEach((userDetails) => {
        displayUserOnScreen(userDetails);
      });
    })
    .catch((error) => console.log(error));
  
}

function displayUserOnScreen(userDetails){
  
  const userId = userDetails["_id"]
  const userItem = document.createElement("li");
  userItem.setAttribute("id", userId);
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
        
        `https://crudcrud.com/api/1a4a9cc4f8cb497d93205dd977d2e446/todo/${userId}`
      )
      .then(() => {
        getUsers();
      })
      .catch((error) => console.log(error));
  });
  
  editBtn.addEventListener("click", function (event) {
    const livalue = event.target.parentElement.childNodes[0].textContent.split("-");
    userIdToEdit = event.target.parentElement.getAttribute("id");
    const username=document.getElementById("username");
    const email=document.getElementById("email");
    const phoneno=document.getElementById("phone");
    username.value=livalue[0];
    email.value=livalue[1];
    phoneno.value=livalue[2];
   
})
}
