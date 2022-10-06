// Recupérer le panier si elle est dans le localStorage et le convertir en format JAVASCRIPT
let productInLocalstorage = JSON.parse(localStorage.getItem("tabBasket"));
console.log(productInLocalstorage);

let sectionCart = document.querySelector("#cart__items");
if (productInLocalstorage === null) {
  let panierVide = `<h2>Votre panier est vide</h2>`;
  sectionCart.innerHTML = panierVide;
} else {
  // Si le panier n'est pas vide
  for (let i = 0; i < productInLocalstorage.length; i++) {
    console.log(productInLocalstorage[i].idOfProduct);
    let sectionCartItems = document.querySelector("#cart__items");
    let art = document.createElement("article");
    art.setAttribute("data-id", `${productInLocalstorage[i].idOfProduct}`);
    art.setAttribute(
      "data-color",
      `${productInLocalstorage[i].colorsOfProduct}`
    );
    art.classList.add("cart__item");
    sectionCartItems.appendChild(art);

    // Création de la première div de balise article qui contient l'image de produit
    let divImageItem = document.createElement("div");
    divImageItem.classList.add("cart__item__img");
    art.appendChild(divImageItem);
    let imageItem = `${productInLocalstorage[i].imageOfProduct}`;
    divImageItem.innerHTML = imageItem;
    // Création de la deuxième div de balise article
    let divItemContent = document.createElement("div");
    divItemContent.classList.add("cart__item__content");
    art.appendChild(divItemContent);
    // Création de la première div de divItemContent
    let divItemContentDescription = document.createElement("div");
    divItemContentDescription.classList.add("cart__item__content__description");
    divItemContent.appendChild(divItemContentDescription);

    // Création des éléments (Nom, color, prix) de divItemContentDescription
    let name = document.createElement("h2");
    name.textContent = `${productInLocalstorage[i].nameOfProduct}`;
    divItemContentDescription.appendChild(name);
    let color = document.createElement("p");
    color.textContent = `${productInLocalstorage[i].colorsOfProduct}`;
    divItemContentDescription.appendChild(color);
    // On fetch pour récupérer le prix du produit
    let url = "http://localhost:3000/api/products";
    fetch(url).then((response) =>
      response.json().then((data) => {
        for (let product of data) {
          if (product._id === productInLocalstorage[i].idOfProduct) {
            console.log(product.price);
            let price = document.createElement("p");
            price.textContent = `${product.price} €`;
            divItemContentDescription.appendChild(price);
          }
        }
      })
    );

    // Création de div Content__Sttings
    let divItemContentSettings = document.createElement("div");
    divItemContentSettings.classList.add("cart__item__content__settings");
    divItemContent.appendChild(divItemContentSettings);
    // Création de div Settings Quantity
    let divItemContentSettingsQuantity = document.createElement("div");
    divItemContentSettingsQuantity.classList.add(
      "cart__item__content__settings__quantity"
    );
    divItemContentSettings.appendChild(divItemContentSettingsQuantity);
    // Création des éléments de div Settings Quantity
    let paraQuantity = document.createElement("p");
    paraQuantity.textContent = "Qté : ";
    divItemContentSettingsQuantity.appendChild(paraQuantity);
    let inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", Number("1"));
    inputQuantity.setAttribute("max", Number("100"));
    inputQuantity.setAttribute(
      "value",
      `${productInLocalstorage[i].quantityOfProduct}`
    );
    divItemContentSettingsQuantity.appendChild(inputQuantity);
    // Création de div Settings Delet
    let divItemContentSettingsDelet = document.createElement("div");
    divItemContentSettingsDelet.classList.add(
      "cart__item__content__settings__delete"
    );
    divItemContentSettings.appendChild(divItemContentSettingsDelet);

    // Création des éléments de div Settings Quantity
    let paraDelet = document.createElement("p");
    paraDelet.textContent = "Suprimer";
    paraDelet.classList.add("deleteItem");
    divItemContentSettingsDelet.appendChild(paraDelet);
  }
  // if(i === productInLocalstorage.length){

  // }
}