document.addEventListener("DOMContentLoaded", initialize);


// Don't remove anything just complete the functions


// When the page get load display all users
 function initialize(){
     const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
     for (let i = 0; i < usersList.length; i++){
         display(usersList[i]);
     }

 }


// add new users in usersList array
function handleFormSubmit(event) {  
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const id = Date.now();
    const userData = {
        username: username,
        email: email,
        phone: phone,
        id: id
    };
    usersList.push(userData);
    display(userData);
    localStorage.setItem("usersList", JSON.stringify(usersList));
}



 // use this function to display user on screen
 function display(userData) {
     const ul = document.querySelector('ul');
     const newLi = document.createElement('li');
     newLi.textContent = userData.username+" "+userData.email+" "+userData.phone;
     const delBtn = document.createElement('button');
     delBtn.textContent = 'Delete';
     delBtn.addEventListener('click',()=> deleteData(userData.id, newLi));
     newLi.appendChild(delBtn);
     ul.appendChild(newLi);
 }


 // use this function to delete the user details from local store and DOM (screen)
function deleteData(id, li) {
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const updatedUsersList = [];
    for (let i = 0; i < usersList.length; i++){
        if (id !== usersList[i].id) {
            updatedUsersList.push(usersList[i]);
        }
    }
     li.remove();
    localStorage.setItem('UsersList', JSON.stringify(updatedUsersList));
 }