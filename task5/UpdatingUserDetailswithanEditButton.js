document.addEventListener("DOMContentLoaded", initialize);

    // Don't remove anything just complete the functions

    // When the page get load display all users
    function initialize(){
        const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
        for (let i = 0; i < usersList.length; i++){
            display(usersList[i]);
        }
        sessionStorage.removeItem('editId');
    }

    // add new users in usersList array
function handleFormSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const userData = {
        username: username,
        email: email,
        phone: phone,
    };
    const usersList = JSON.parse(localStorage.getItem('usersList')) || [];
    const editId = sessionStorage.getItem('editId');
    if (editId) {
        update(usersList, userData, editId);
        const li = document.getElementById(editId);
        li.firstChild.textContent = userData.username + " " + userData.email + " " + userData.phone;
        
    } else {
        addData(usersList, userData);
    }
   
    localStorage.setItem('usersList', JSON.stringify(usersList));
    
}

    // use this function to display user on screen
    function display(userData) {
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        li.id =userData.id ;
        li.textContent = userData.username + " " + userData.email + " " + userData.phone;
        
        ul.appendChild(li);
        const delbtn = document.createElement('button');
        delbtn.textContent = 'Delete';
        li.appendChild(delbtn);
        delbtn.addEventListener('click', () => deleteData(userData.id, li));
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        li.appendChild(editBtn);
        editBtn.addEventListener('click', () => editData(userData));

    }

    // use this function to add user details into local storage
    function addData(usersList,userData) {
        usersList.push(userData);
        userData.id = Date.now();
        display(userData);
    }


    // use this function to delete the user details from local store and DOM (screen)
    function deleteData(id,li) {
        const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
        const newUsersList = [];
        for (let i = 0; i < usersList.length; i++){
            if (id !== usersList[i].id) {
                newUsersList.push(usersList[i]);
            }
        }
        localStorage.setItem("usersList", JSON.stringify(newUsersList));
        li.remove();
    }

    // use this function to update user details from local storage
    function editData(userData) {
        const usernameInput = document.querySelector('#username');
        const emailInput = document.querySelector('#email');
        const phoneInput = document.querySelector('#phone');
        usernameInput.value = userData.username;
        emailInput.value = userData.email;
        phoneInput.value = userData.phone;
        sessionStorage.setItem("editId", userData.id);
        
    }
function update(usersList, userData, editId) {
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].id === editId) {
            usersList[i].username = userData.username;
            usersList[i].email = userData.email;
            usersList[i].phone = userData.phone;
        }
        sessionStorage.removeItem('editId');

    }
    sessionStorage.removeItem('editId')
}