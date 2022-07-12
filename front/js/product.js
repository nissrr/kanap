
//recuperation de l'id du produit et placement dans une variable
let params = new URL(document.location).searchParams;
let id = params.get("id");

//appel api du produit avec l'id recuperer plus haut 
fetch(`http://localhost:3000/api/products/${id}`)
.then(res => res.json())
.then(data => {
    document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    document.getElementById('title').innerHTML = `${data.name}`;
    document.getElementById('price').innerHTML = `${data.price}`;
    document.getElementById('description').innerHTML = `${data.description}`;
    let arraycolor = data.colors;
    for(let i=0; i < data.colors.length; i++){
        const el = document.createElement('option')
        el.value = arraycolor[i];
        el.text = arraycolor[i];
        document.getElementById('colors').appendChild(el);
    }

    //-------- Ajout du panier --------//
    let envoyerPanier = document.getElementById('addToCart')
    envoyerPanier.addEventListener('click', (event) => {
    event.preventDefault();

    //Recuperation des infos du produit//
    let optionProduct = {
        idProduit: data._id,
        colorProduit: document.getElementById('colors').value,
        quantity: parseInt(document.getElementById('quantity').value),
    };


    // mise en place du local storage
    let productLocalStorage = JSON.parse(localStorage.getItem('produit'));
    popupConfirmation = () => {
        if(window.confirm(`${data.name} à bien été ajouté au panier. 
Appuyer sur OK pour vérifier votre panier.`)){
            window.location.href = "cart.html"
        }
    };
 
//Ajout des produit dans le panier, 
// Augmenter la quantité du produit s'il est deja présent dans le local et que la couleur
//et l'id sont identiques
colorProduit = document.getElementById('colors').value

if(quantity.value > 0 && colorProduit){
    if(productLocalStorage){
        //s'il y a des produit dans le local storage
        let foundProduct = productLocalStorage.find(element => element.idProduit === optionProduct.idProduit && element.colorProduit === optionProduct.colorProduit);
        if(foundProduct){
            foundProduct.quantity += optionProduct.quantity
        }
        else{
            productLocalStorage.push(optionProduct)    
        }
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        popupConfirmation();
    }
    //si le localstorage est vide 
    else{
        productLocalStorage = [];
        productLocalStorage.push(optionProduct);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        popupConfirmation();
    }
}
else{
    window.alert('Veuillez sélectionner une couleur et une quantité !')
}
})
})




