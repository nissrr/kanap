const pannier = document.getElementById('cart__items');
let productLocalStorage = JSON.parse(localStorage.getItem('produit'));


 // Affichage des produit dans le panier
 if(productLocalStorage === null){
    let pannierVide = `le panier est vide`;
    pannier.innerHTML = pannierVide;
 }
 else{
  for(let k = 0; k < productLocalStorage.length ; k++){
    let id = productLocalStorage[k].idProduit
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then(data => {
        pannier.innerHTML += `
          <article class="cart__item" data-id="${productLocalStorage[k].idProduit}" data-color="{product-color}">
          <div class="cart__item__img">
            <img src=${data.imageUrl} alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${productLocalStorage[k].colorProduit}</p>
              <p>${data.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productLocalStorage[k].quantity}>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article> `;

        // Calcul du prix Total
        let prixTotalCalcul = [];   
         for(let i = 0; i < productLocalStorage.length; i ++){
            let prixArticle = data.price * productLocalStorage[i].quantity;
            prixTotalCalcul.push(prixArticle);
          }
        let prixTotal = prixTotalCalcul.reduce((acc, cur) => acc + cur, 0);
        document.getElementById('totalPrice').innerHTML = prixTotal;

        //Changer les quantités des articles dynamiquement depuis le panier
        let changeQuantity = Array.from(document.querySelectorAll('.itemQuantity'));
        console.log(changeQuantity)
        for(let q= 0; q < changeQuantity.length; q++){
        changeQuantity[q].addEventListener('change', () => {
            let quantityArticle = changeQuantity[q].value;
            productLocalStorage[q].quantity = quantityArticle;
            
            localStorage.setItem("produit", JSON.stringify(productLocalStorage));

            location.reload()
        })
        };

        //Supprimer un article du panier
        let DeleteItem = Array.from(document.querySelectorAll(".deleteItem"));
        for(let s=0; s < DeleteItem.length ; s++){
          DeleteItem[s].addEventListener('click', () => {
            productLocalStorage.splice([s], 1)
            console.log(productLocalStorage)

            localStorage.setItem("produit", JSON.stringify(productLocalStorage))

            window.alert("L'article a bien été supprimé du panier !")

            location.reload()
          })
        }
    }
    )}
}

//Changer les quantités des articles dynamiquement depuis le panier
let changeQuantity = Array.from(document.querySelectorAll('.itemQuantity'));
console.log(changeQuantity)
for(let q= 0; q < changeQuantity.length; q++){
changeQuantity[q].addEventListener('change', () => {
  let quantityArticle = changeQuantity[q].value;
  productLocalStorage[q].quantity = quantityArticle;
  
  localStorage.setItem("produit", JSON.stringify(productLocalStorage));

  location.reload()
})
};

//Calcul des Quantités
let TotalQuantityCalcul = [];
for( let q = 0; q < productLocalStorage.length; q ++){
    TotalQuantityCalcul.push((+productLocalStorage[q].quantity))
}
let TotalQuantity = TotalQuantityCalcul.reduce((a, b) => 
a + b);
document.getElementById('totalQuantity').innerHTML = TotalQuantity;


//Création du tableau product-Id a envoyer au back end
let products = [];
for(let j=0; j < productLocalStorage.length; j++){
  let productsID = productLocalStorage[j].idProduit;
  products.push(productsID);
}

console.log(products)

// Formulaire
document.getElementById('order').addEventListener('click', (a) => {

a.preventDefault();

//Vérification du formulaire avec les regEx
let Prenom = document.getElementById('firstName').value
function prenomControle () {
if(/^[A-Za-z]{3,20}$/.test(Prenom)){
  return true;
}else{
  document.getElementById('firstNameErrorMsg').innerHTML = ' Veuillez renseigner votre prénom !';
}
};

let Nom = document.getElementById('lastName').value;
function nomControle () {
if(/^[A-Za-z]{3,20}$/.test(Nom)){
  return true;
}else{
  document.getElementById('lastNameErrorMsg').innerHTML = ' Veuillez renseigner votre nom !';
}};

let Adresse = document.getElementById('address').value;
function addresseControle () {
if(/^[A-Za-z]{3,20}$/.test(Adresse)){
  return true;
}else{
  document.getElementById('addressErrorMsg').innerHTML = ' Veuillez renseigner votre adresse !';
}};

let Ville = document.getElementById('city').value;
function villeControle () {
if(/^[A-Za-z]{3,20}$/.test(Ville)){
  return true;
}else{
  document.getElementById('cityErrorMsg').innerHTML = ' Veuillez renseigner votre ville !';
  return false;
}};

let Email = document.getElementById('email').value;
function emailControle () {
if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)){
  return true;
}else{
  document.getElementById('emailErrorMsg').innerHTML = ' Veuillez renseigner votre mail !';
  return false;
}}

prenomControle();
nomControle();
addresseControle();
villeControle();
emailControle();

// Recuperation des champs du formulaire
let contact = {
  firstName: Prenom,
  lastName: Nom,
  address: Adresse,
  city: Ville,
  email: Email,
}
console.log(contact)

const aEnvoyer = {
  contact,
  products
}

//Envoie du formulaire vers le back end
if(prenomControle() && nomControle() && addresseControle() && villeControle() && emailControle())
{
  fetch("http://localhost:3000/api/products/order", {
    method : "POST",
    body : JSON.stringify(aEnvoyer),
    headers: {
      "Content-Type": "application/json",
    }
  }
  )
  .then(res => res.json())
  .then(data => {
  let orderId = data.orderId;
  localStorage.setItem('orderId', JSON.stringify(orderId));
  })
  window.location.href ="confirmation.html"
}
else(
  alert('Veuillez renseigner correctement tous les champs demandés.')
)

})

;



