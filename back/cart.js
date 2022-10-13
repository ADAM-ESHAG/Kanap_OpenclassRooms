// Recupérer le panier si elle est dans le localStorage et le convertir en format JAVASCRIPT
let productInLocalstorage = JSON.parse(localStorage.getItem("tabBasket"));
console.log(productInLocalstorage);

let sectionCart = document.querySelector("#cart__items");
if (productInLocalstorage === null) {
  let panierVide = `<h2>Votre panier est vide</h2>`;
  sectionCart.innerHTML = panierVide;
} else {
  // Si le panier n'est pas vide
  // On fetch pour récupérer le prix du produit
  let url = "http://localhost:3000/api/products";
  fetch(url).then((response) =>
    response.json().then((data) => {
      for (let i = 0; i < productInLocalstorage.length; i++) {
        console.log(productInLocalstorage[i].idOfProduct);
        let sectionCartItems = document.querySelector("#cart__items");
        let articleCartItem = document.createElement("article");
        articleCartItem.setAttribute(
          "data-id",
          `${productInLocalstorage[i].idOfProduct}`
        );
        articleCartItem.setAttribute(
          "data-color",
          `${productInLocalstorage[i].colorsOfProduct}`
        );
        articleCartItem.classList.add("cart__item");
        sectionCartItems.appendChild(articleCartItem);

        // Création de la première div de balise article qui contient l'image de produit
        let divImageItem = document.createElement("div");
        divImageItem.classList.add("cart__item__img");
        articleCartItem.appendChild(divImageItem);
        let imageItem = `${productInLocalstorage[i].imageOfProduct}`;
        divImageItem.innerHTML = imageItem;
        // Création de la deuxième div de balise article
        let divItemContent = document.createElement("div");
        divItemContent.classList.add("cart__item__content");
        articleCartItem.appendChild(divItemContent);
        // Création de la première div de divItemContent
        let divItemContentDescription = document.createElement("div");
        divItemContentDescription.classList.add(
          "cart__item__content__description"
        );
        divItemContent.appendChild(divItemContentDescription);

        // Création des éléments (Nom, color, prix) de divItemContentDescription
        let name = document.createElement("h2");
        name.textContent = `${productInLocalstorage[i].nameOfProduct}`;
        divItemContentDescription.appendChild(name);
        let color = document.createElement("p");
        color.textContent = `${productInLocalstorage[i].colorsOfProduct}`;
        divItemContentDescription.appendChild(color);
        for (let product of data) {
          if (product._id === productInLocalstorage[i].idOfProduct) {
            console.log(product.price);
            let price = document.createElement("p");
            price.textContent = `${product.price} €`;
            divItemContentDescription.appendChild(price);
          }
        }
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

        /*********************Partie formulaire****************/
        // -----Injection du HTML -----
        let divCartOrder = document.querySelector(".cart__order");
        let formHTML = `<form method="get" class="cart__order__form">
                <div class="cart__order__form__question">
                  <label for="firstName">Prénom: </label>
                  <input type="text" name="firstName" id="firstName" required />
                  <p id="firstNameErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="lastName">Nom: </label>
                  <input type="text" name="lastName" id="lastName" required />
                  <p id="lastNameErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="address">Adresse: </label>
                  <input type="text" name="address" id="address" required />
                  <p id="addressErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="city">Ville: </label>
                  <input type="text" name="city" id="city" required />
                  <p id="cityErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="email">Email: </label>
                  <input type="email" name="email" id="email" required />
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="cart__order__form__submit">
                  <input type="submit" value="Commander !" id="order" />
                </div>
              </form>`;
        divCartOrder.innerHTML = formHTML;
      }

      //------------------Function modification de quantité -----------------
      function upDateNewQuantity() {
        let quantityUpDate = document.querySelectorAll(".itemQuantity");
        // ------Parcourir les inputs-----
        for (let quantity of quantityUpDate) {
          // ---- Ecoute l'input ----
          quantity.addEventListener("change", () => {
            // ----Cibler les parent de l'input en écoute pour récupérer son attribute data-id et data-color----
            let dataId = quantity
              .closest(".cart__item")
              .getAttribute("data-id");
            let dataColor = quantity
              .closest(".cart__item")
              .getAttribute("data-color");
            // --- Déclaration de variable newQuantity
            let newQuantity = Number(quantity.value);
            if (newQuantity > 0 && newQuantity <= 100) {
              // **** Parcourir le tableau dans le LocalStorage ****
              for (let k = 0; k < productInLocalstorage.length; k++) {
                let storageId = productInLocalstorage[k].idOfProduct;
                let storageColor = productInLocalstorage[k].colorsOfProduct;
                /**** Si l'id et la couleur de produit dans le LocalStorage et celui de input en écoute sont identique ? 
               Alors on change le quantité de produit localStorage ****/
                if (storageId === dataId && storageColor === dataColor) {
                  productInLocalstorage[k].quantityOfProduct = newQuantity;
                }
              }
              // *** Mise à jour de LocalStorage ****
              localStorage.setItem(
                "tabBasket",
                JSON.stringify(productInLocalstorage)
              );
            }
          });
        }
      }
      upDateNewQuantity();

      /******** Function Suprission de produit *******/
      function deletProduct() {
        let deletArticle = document.querySelectorAll(".deleteItem");
        console.log(deletArticle);
        for (let del of deletArticle) {
          del.addEventListener("click", () => {
            // ----Cibler les parent de l'element en écoute pour récupérer leur attribute data-id et data-color----
            let dataId = del.closest(".cart__item").getAttribute("data-id");
            let dataColor = del
              .closest(".cart__item")
              .getAttribute("data-color");
            console.log(dataId);
            // **** Parcourir le LocalStorage ****
            for (let k = 0; k < productInLocalstorage.length; k++) {
              let storageId = productInLocalstorage[k].idOfProduct;
              let storageColor = productInLocalstorage[k].colorsOfProduct;
              /**** Si l'id et la couleur de produit dans le LocalStorage et celui de parents de l'element en écoute sont identique ? 
               Alors on suprime l'element et ses parents de localStorage ****/
              if (storageId === dataId && storageColor === dataColor) {
                productInLocalstorage.splice(k);
              }
            }
            // *** Mise à jour de LocalStorage ****
            localStorage.setItem(
              "tabBasket",
              JSON.stringify(productInLocalstorage)
            );
            // ---Si LocalStorage est vide alor surprime le tableau (tabBasket)
            if (productInLocalstorage.length == 0) {
              localStorage.removeItem("tabBasket");
            }
          });
        }
        return;
      }
      deletProduct();

      //**** Function Totalité d'article et du prix *****/
      function getTotalArticlePrice() {
        let totalQuantity = 0;
        let totalPrice = 0;
        for (let i = 0; i < productInLocalstorage.length; i++) {
          totalQuantity += productInLocalstorage[i].quantityOfProduct;
          for (let product of data) {
            if (product._id === productInLocalstorage[i].idOfProduct) {
              totalPrice +=
                productInLocalstorage[i].quantityOfProduct * product.price;
              console.log(totalPrice);
            }
          }
        }
        console.log(totalQuantity);
        // Création de div CartPrice
        let divCartPrice = document.querySelector(".cart__price");
        divCartPrice.innerHTML = `<p>
                Total (<span id="totalQuantity">${totalQuantity}</span> articles) :
                <span id="totalPrice">${totalPrice}</span> €
              </p>`;
      }
      getTotalArticlePrice();

      /**************Gestionne de validation formulaire *********/
      let form = document.querySelector(".cart__order__form");
      
      //-----------Ecouter la modification du prénom---------------
      form.firstName.addEventListener("change", function(){
        yourFirstName(this);
      });
      // ----------Function Vérification du prénom-----------
      const yourFirstName = function(firstname){
        // Création de reg exp pour valider le prénom
        let firstNameRegExp = new RegExp(/^[a-zA-Z]{3,15}$/);
        
        // On test le prénom entrée
        let testFirstName = firstNameRegExp.test(firstname.value);
        
        // On cible l'element qui vient just après
        let messageFirstName = firstname.nextElementSibling;

        // Si le test du prénom est valide
        if(testFirstName){
          // Envoie ce message
          messageFirstName.textContent = 'Prénom valide';
        } else {
          // Envoie ceci
          messageFirstName.textContent = 'Prénom non valide';
        }
      }
      
      // --------Ecoute la modification du nom
      form.lastName.addEventListener("change", function(){
        yourLastName(this);
      });
      // -----Function verification du nom----------
      const yourLastName = function(lastname){
        // Création de RegExp pour valider le nom
        let lastNameRegExp = new RegExp(/^[a-zA-Z\s-]{3,15}$/);
        // On test le nom entrée
        let testLastName = lastNameRegExp.test(lastname.value);
        // On cible l'element qui vient just après
        let messageLastName = lastname.nextElementSibling;
        // Si le test du nom est valide
        if (testLastName) {
          // Envoie ce message
          messageLastName.textContent = "Nom valide";
        } else {
          // Envoie ceci
          messageLastName.textContent =
            "Nom non valide";
        }
      }
      
      // --------Ecoute la modification de l'adresse
      form.address.addEventListener("change", function(){
        yourAdress(this);
      });
      // Function vérification d'adresse
      const yourAdress = function(adress){
        // Création de RegExp de l'adresse
        let adressRegExp = new RegExp(/^[a-zA-Z0-9\s-]{10,30}$/);
        // On test l'adresse entrée
        let testAdress = adressRegExp.test(adress.value);
        // On cible l'element qui suive l'input adress
        let messageAdress = adress.nextElementSibling;
        // Si l'adresse est valide
        if(testAdress){
          messageAdress.textContent = "Adresse valide";
        } else {
          messageAdress.textContent = "Adresse non valide";
        }
      }

      // -------Ecoute la modification de ville
      form.city.addEventListener("change", function(){
        yourCity(this);
      });
      // ---------Function vérification de ville
      const yourCity = function(city){
        // Création de RegExp de la ville
        let cityRegExp = new RegExp(/^[a-zA-Z0-9\s-]{3,20}$/);
        // On test la ville entrée
        let testCity = cityRegExp.test(city.value);
        // On cible l'element qui suis l'input ville
        let messageCity = city.nextElementSibling;
        // On vérifie si la ville saisis est bonne
        if(testCity){
          // Renvoie ce message
          messageCity.textContent = "Ville valide";
        }else {
          // Renvoie ceci
          messageCity.textContent = "Ville non valide";
        }
      }

      // ---------Ecoute la modification de l'email--------
      form.email.addEventListener("change", function(){
        yourEmail(this);
      });
      // ---------Function vérification du mail
      const yourEmail = function(email){
        // Création de RegExp du mail
        let emailExgExp = new RegExp(
          "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
          "g"
        );
        // On test l'email entreé
        let testEmail = emailExgExp.test(email.value);
        // On cible l'element qui suis l'input email
        let messageEmail = email.nextElementSibling;
        // On vérifie si l'email entrée est bonne
        if(testEmail){
          // Affiche ce message
          messageEmail.textContent = "Email valide";
        }
        else {
          // Affiche ceci
          messageEmail.textContent = "Email non valide";
        }
      }


    })
  );

  /*
  // Deuxième méthode
  function getKanapInfo(kanap) {
    return new Promise((resolve) => {
      fetch(`http://localhost:3000/api/products/${kanap.idOfProduct}`)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          kanap.altTxt = result.altTxt;
          kanap.price = result.price;
          resolve(kanap);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  Promise.all(productInLocalstorage.map(getKanapInfo)).then((result) => {
    // La suite du code de toute ma page se passe ici.

    let cartHtml = "";
    result.forEach((kanap) => {
      cartHtml += `

            <article
                class="cart__item"
                data-id="${kanap.idOfProduct}"
                data-color="${kanap.colorsOfProduct}"
              >
                <div class="cart__item__img">
                  ${kanap.imageOfProduct}
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${kanap.nameOfProduct}</h2>
                    <p>${kanap.colorsOfProduct}</p>
                    <p>${kanap.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input
                        type="number"
                        class="itemQuantity"
                        name="itemQuantity"
                        min="1"
                        max="100"
                        value="${kanap.quantityOfProduct}"
                      />
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
           
           `;
    });
    let cart = document.querySelector("#cart__items");
    cart.innerHTML = cartHtml;
    //Création d'une function de modification de quantité
         let quantityUpDate = document.querySelector(".itemQuantity");
         quantityUpDate.addEventListener('change', function() {
           kanap.quantityOfProduct = quantityUpDate;
         })
  });*/
}
