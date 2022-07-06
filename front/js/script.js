
// Recuperation des données de l'API //
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    for(items of data) {
        document.getElementById('items').innerHTML += `<a href="http://127.0.0.1:5500/front/html/product.html?id=${items._id}">
        <article>
          <img src="${items.imageUrl}" alt="${items.altTxt}">
          <h3 class="productName">${items.name}</h3>
          <p class="productDescription">${items.description}</p>
        </article>
      </a>`
      }
})



    



