// Mise en relation avec la page Product //
let params = new URL(document.location).searchParams;
let id = params.get("id");

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
        nomProduit: data.name,
        idProduit: data._id,
        colorProduit: document.getElementById('colors').value,
        quantity: document.getElementById('quantity').value,
        prixProduit: data.price,
        imageUrl: data.imageUrl,
    };
    console.log(optionProduct);

    // mise en place du local storage
    let productLocalStorage = JSON.parse(localStorage.getItem('produit'));
    popupConfirmation = () => {
        if(window.confirm(`${data.name} à bien été ajouté au panier. 
Appuyer sur OK pour vérifier votre panier.`)){
            window.location.href = "cart.html"
        }else{
            
        }
    };
 
//Augmenter la quantité du produit s'il est deja présent dans le local et que la couleur
//et l'id sont identiques

    if(productLocalStorage){
        let foundProduct = productLocalStorage.find(element => element.idProduit == optionProduct.idProduit && element.colorProduit == optionProduct.colorProduit);
        if(foundProduct){
        optionProduct.quantity ++
        console.log(productLocalStorage);
        }
        productLocalStorage.push(optionProduct);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        popupConfirmation();
    }
    else{
        productLocalStorage = [];
        productLocalStorage.push(optionProduct);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        popupConfirmation();
    }
    
})
})




