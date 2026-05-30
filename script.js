let products = document.getElementsByClassName("products")[0]

function getAllProducts(){
    fetch("https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=5")
    .then((response)=>response.json())
    .then((data)=>{
        data.products.forEach(item => {
        products.innerHTML+=productHtml(item)
        });
    })
}
getAllProducts()

function productHtml(item){
    return `
    <div class="eachProduct">
        <p class="price discountPrice">${item.price.current} ${item.price.currency} ${item.price.beforeDiscount} ${item.price.discountPercentage}</p>
        <img src="${item.thumbnail}">  
        <p class="title">${item.title}</p>
        <p class="description">${item.description}</p>
        <button class="addToCart"></button>
    </div>
    `
}
