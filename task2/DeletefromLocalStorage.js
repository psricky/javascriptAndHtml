function handleFormSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const obj = {
        username, email, phone
    };
    const updated_obj = JSON.stringify(obj);
    localStorage.setItem(email, updated_obj);
    displayUser(obj);
}
function displayUser(obj) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.textContent = `${obj.username}-${obj.email}-${obj.phone}`;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', ()=> {
        li.remove();
        localStorage.removeItem(obj.email);
    });
    li.appendChild(delBtn);
    ul.appendChild(li);
}