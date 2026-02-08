const apiUrl = "https://crudcrud.com/api/5807e77b52d34c3fa627314e95809e8e/todo/";

window.addEventListener("DOMContentLoaded", getProducts);

function resetForm (){
    document.getElementById('price').value = '';
    document.getElementById('product').value = '';
    document.getElementById('category').value = 'Electronics';
}
// ADD PRODUCT
async function addProduct() {
    try {
        const price = document.getElementById('price').value;
        const product = document.getElementById('product').value;
        const category = document.getElementById('category').value;

        const obj = { price, product, category };

        const res = await axios.post(apiUrl, obj);
        resetForm();
        showProductsOnScreen(res.data);
    } catch (err) {
        console.log(err);
    }
}

// SHOW PRODUCT ON SCREEN
function showProductsOnScreen(obj) {
    let parent;
    if (obj.category === 'Electronics') parent = document.getElementById('electronics');
    if (obj.category === 'Food') parent = document.getElementById('food');
    if (obj.category === 'Skincare') parent = document.getElementById('skincare');

    const li = document.createElement('li');
    li.id = obj._id;

    const text = document.createTextNode(
        `${obj.price}-${obj.category}-${obj.product}`
    );

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete Order';

    delBtn.addEventListener('click', () => {
        deleteProduct(obj._id, obj.category);
    });

    li.appendChild(text);
    li.appendChild(delBtn);
    parent.appendChild(li);
}

// GET ALL PRODUCTS
async function getProducts() {
    try {
        const res = await axios.get(apiUrl);
        res.data.forEach(obj => {
            showProductsOnScreen(obj);
        });
    } catch (err) {
        console.log(err);
    }
}

// DELETE PRODUCT
async function deleteProduct(id, category) {
    try {
        await axios.delete(`${apiUrl}${id}`);
        const userLists = document.querySelectorAll("ul");
       userLists.forEach(ul => ul.innerHTML = "");
       await getProducts();

    } catch (err) {
        console.log(err);
    }
}