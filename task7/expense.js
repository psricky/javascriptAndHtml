const apiUrl="https://ca71eec644027c2f56d1.free.beeceptor.com/api/users/";

window.addEventListener("DOMContentLoaded",getProducts);
function addProduct(){
    const price=document.getElementById('price').value;
    const product=document.getElementById('product').value;
    const category=document.getElementById('category').value;

    const obj={
        price,
        product,
        category
    };

    axios.post(apiUrl,obj)
        .then((res)=>{
            showProductsOnScreen(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
}
function showProductsOnScreen(obj){
    let parent;
    if(obj.category==='Electronics') parent=document.getElementById('electronics');
    if(obj.category==='Food') parent=document.getElementById('food');
    if(obj.category==='Skincare') parent=document.getElementById('skincare');

    const li=document.createElement('li');
    li.id=obj._id;
    const text=document.createTextNode(`${obj.price}-${obj.category}-${obj.product}`);
    
    const delBtn=document.createElement('button');
    delBtn.textContent='Delete Order';
    
    delBtn.addEventListener('click',()=>{
        deleteProduct(obj._id,obj.category);
    });

    li.appendChild(text);
    li.appendChild(delBtn);
    parent.appendChild(li);
}
function getProducts(){
    axios.get(apiUrl)
        .then((res)=>{
            res.data.forEach(obj => {
                showProductsOnScreen(obj);
            });
        })
        .catch((err)=>{
            console.log(err);
        })
}
function deleteProduct(id,category){
    axios.delete(`${apiUrl}/${id}`)
        .then(()=>{
            let parent;
            if(category==='Electronics') 
                parent=document.getElementById('electronics');
            if(category==='Food')
                parent=document.getElementById('food');
            if(category==='Skincare')
                parent=document.getElementById('skincare');

            const child=document.getElementById(id);
                parent.removeChild(child);
        })
        .catch((err)=>{
            console.log(err);
        })
}