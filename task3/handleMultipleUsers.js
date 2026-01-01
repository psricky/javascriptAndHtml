function handleFormSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const user = {
        username: username,
        email: email,
        phone: phone
    };
    const updated_user = JSON.stringify(user);
    localStorage.setItem(email, updated_user);
    display(user);
}
    function display(user){
    const ul = document.querySelector('ul');
    const newLi = document.createElement('li');
    newLi.textContent = `${user.username}-${user.email}-${user.phone}`;
    ul.appendChild(newLi);
}