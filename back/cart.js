// Recupérer le panier si elle est dans le localStorage et le convertir en format JAVASCRIPT
let productInLocalstorage = JSON.parse(localStorage.getItem("tabBasket"));

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
                  <input type="submit" value="Commander !" id="order" name='order'/>
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
        for (let del of deletArticle) {
          del.addEventListener("click", () => {
            // ----Cibler les parent de l'element en écoute pour récupérer leur attribute data-id et data-color----
            let dataId = del.closest(".cart__item").getAttribute("data-id");
            let dataColor = del
              .closest(".cart__item")
              .getAttribute("data-color");

            // **** Parcourir le LocalStorage ****
            for (let k = 0; k < productInLocalstorage.length; k++) {
              /**** Si l'id et la couleur de produit dans le LocalStorage et celui de parents de l'element en écoute sont identique ? 
               Alors on suprime l'element et ses parents de localStorage ****/
              if (
                productInLocalstorage[k].idOfProduct === dataId &&
                productInLocalstorage[k].colorsOfProduct === dataColor
              ) {
                productInLocalstorage.splice(k, 1);
              }
            }
            
            // *** Mise à jour de LocalStorage ****
            localStorage.setItem(
              "tabBasket",
              JSON.stringify(productInLocalstorage)
            );
            // ---Si LocalStorage est vide alors surprime le tableau (tabBasket)
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
            }
          }
        }

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
      form.setAttribute("action", "confirmation.html");

      //-----------Ecouter la modification du prénom---------------
      form.firstName.addEventListener("change", function () {
        valideFirstName(this);
      });

      // --------Ecoute la modification du nom
      form.lastName.addEventListener("change", function () {
        valideLastName(this);
      });

      // --------Ecoute la modification de l'adresse
      form.address.addEventListener("change", function () {
        valideAdress(this);
      });

      // -------Ecoute la modification de ville
      form.city.addEventListener("change", function () {
        valideCity(this);
      });

      // ---------Ecoute la modification de l'email--------
      form.email.addEventListener("change", function () {
        valideEmail(this);
      });

      //-----------Ecouter la modification du Soumission---------------
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (
          valideFirstName(form.firstName) &&
          valideLastName(form.lastName) &&
          valideAdress(form.address) &&
          valideCity(form.city) &&
          valideEmail(form.email)
        ) {
          
          let productId = [];
          for (let product of productInLocalstorage) {
            productId.push(product.idOfProduct);
          }
          // Création d'un objet contact
          const form = {
            'contact': {
              'firstName': event.target.querySelector('input[name="firstName"]')
                .value,
              'lastName': event.target.querySelector('input[name="lastName"]')
                .value,
              'address': event.target.querySelector('input[name="address"]')
                .value,
              'city': event.target.querySelector('input[name="city"]').value,
              'email': event.target.querySelector('input[name="email"]')
                .value,
            },
            'products': productId,
          };
          console.log(form);
          // *****Envoie Les données contact et products au serveur avec Requete POST************
          fetch(`http://localhost:3000/api/products/order`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            Cache: 'default'
          }).then((response) => response.json().then((product) => {
            let orderId = product.orderId;
            if(orderId){
              localStorage.clear();
              window.location.href = `confirmation.html?commande=${orderId}`;
            }else{
              alert("Ressayer");
            }
          }));
          
        }
        
      });
      

      // ----------Function Vérification du prénom-----------
      const valideFirstName = function (firstname) {
        // Création de Reg exp pour valider le prénom
        let firstNameRegExp = new RegExp(/^[a-zA-Z]{3,15}$/);
        let firstNameValue = firstname.value;

        // Récupération la paragraphe firstName message d'erreur
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

        // Si le test du prénom est valide
        if (firstNameRegExp.test(firstNameValue)) {
          // Envoie ce message
          firstNameErrorMsg.textContent = "Prénom valide";
          return true;
        } else {
          // Envoie ceci
          firstNameErrorMsg.textContent = "Prénom non valide";
          return false;
        }
      };
      
      // -----Function verification du nom----------
      const valideLastName = function (lastname) {
        // Création de RegExp pour valider le nom
        let lastNameRegExp = new RegExp(/^[a-zA-Z\s-]{3,15}$/);

        // Récupération de paragraphe lastName message d'erreur
        let lastNameErrorMsg = lastname.nextElementSibling;
        // Si le test du nom est valide
        if (lastNameRegExp.test(lastname.value)) {
          // Envoie ce message
          lastNameErrorMsg.textContent = "Nom valide";
          return true;
        } else {
          // Envoie ceci
          lastNameErrorMsg.textContent = "Nom non valide";
          return false;
        }
      };

      // Function vérification d'adresse
      const valideAdress = function (adress) {
        // Création de RegExp de l'adresse
        let adressRegExp = new RegExp(/^[a-zA-Z0-9\s-]{10,30}$/);

        // Récupération de paragraphe adress message d'erreur
        let addressErrorMsg = adress.nextElementSibling;
        // Si l'adresse est valide
        if (adressRegExp.test(adress.value)) {
          addressErrorMsg.textContent = "Adresse valide";
          return true;
        } else {
          addressErrorMsg.textContent = "Adresse non valide";
          return false;
        }
      };

      // ---------Function vérification de ville
      const valideCity = function (city) {
        // Création de RegExp de la ville
        let cityRegExp = new RegExp(/^[a-zA-Z0-9\s-]{3,20}$/);
        // On test la ville entrée

        // Récupération de paragraphe city message d'erreur
        let cityErrorMsg = city.nextElementSibling;

        // On vérifie si la ville saisis est bonne
        if (cityRegExp.test(city.value)) {
          // Renvoie ce message
          cityErrorMsg.textContent = "Ville valide";
          return true;
        } else {
          // Renvoie ceci
          cityErrorMsg.textContent = "Ville non valide";
          return false;
        }
      };

      // ---------Function vérification du mail
      const valideEmail = function (email) {
        // Création de RegExp du mail
        let emailRegExp = new RegExp(
          "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
          "g"
        );

        // Récupération de paragraphe email message d'erreur
        let emailErrorMsg = email.nextElementSibling;

        // On vérifie si l'email entrée est bonne
        if (emailRegExp.test(email.value)) {
          // Affiche ce message
          emailErrorMsg.textContent = "Email valide";
          return true;
        } else {
          // Affiche ceci
          emailErrorMsg.textContent = "Email non valide";
          return false;
        }
      };
    })
  );

  // ------Ecoute bouton order
  // let order = document.querySelector("#order");
  // if(order !== null){
  //   order.addEventListener("click", () => {
  //     // Création d'un objet contact
  //     const contactData = {
  //       firstName: document.querySelector("#firstName").value,
  //       lastName: document.querySelector("#lastName").value,
  //       address: document.querySelector("#address").value,
  //       ville: document.querySelector("#city").value,
  //       email: document.querySelector("#email").value,
  //     };

  //     // *****Envoie Les données contact au serveur avec Requete POST************
  //     let response = fetch("http://localhost:3000/api/products/order", {
  //       method: "POST",
  //       body: JSON.stringify(contactData),
  //       headers: {
  //         "Content-Type": "application/json;charset=utf-8",
  //       },
  //     });

  //     response.then(async (response) => {
  //       try {
  //         console.log(response);
  //         const contenu = await response.json();
  //         console.log(contenu);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     });
  //   });
  // }

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
