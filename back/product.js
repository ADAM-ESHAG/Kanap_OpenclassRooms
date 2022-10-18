/**************Search_params dans le URL de la page produit pour récupérer l'ID de produit *************/
const search_params = new URLSearchParams(window.location.search);
const productId = search_params.get("id");

//-------Afficher le produit cliqué à partir de la page d'accueil--------
fetch(`http://localhost:3000/api/products/${productId}`).then((response) =>
  response.json().then((data) => {
    // *******Insertion des éléments HTML******
    // Insertion d'image
    let imageItem = document.querySelector(".item__img");
    imageItem.innerHTML = `<img src=${data.imageUrl} alt=${data.altTxt} />`;
    // Insertion du nom
    let title = document.querySelector("#title");
    title.innerHTML = `${data.name}`;
    // Insertion du prix
    let price = document.querySelector("#price");
    price.innerHTML = `${data.price}`;
    // Insertion de Description
    let description = document.querySelector("#description");
    description.innerHTML = `${data.description}`;
    let colors = document.querySelector("#colors");
    colors.innerHTML = `<option>--SVP, choisissez une couleur --</option>`;
    // *****Parcourir les options de colors*****
    for (let i = 0; i < data.colors.length; i++) {
      colors.innerHTML += `<option value=${data.colors[i]}>${data.colors[i]}</option>`;
    }
    // Insertion de quantité
    let choiceQuantity = document.querySelector(
      ".item__content__settings__quantity"
    );
    choiceQuantity.innerHTML = `<label for="itemQuantity">Nombre d\'article(s) (1-100) :</label><input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity"/>`;
    // Insertion de button
    let btnAddToCart = document.querySelector(".item__content__addButton");
    btnAddToCart.innerHTML = `<button id="addToCart">Ajouter au panier</button>`;

    //*********LocalStorage*******
    let btnAddProduct = document.querySelector("#addToCart");
    btnAddProduct.addEventListener("click", () => {
      let titleValue = title.innerHTML; // Récupération du nom du produit choisi
      let imageItemValue = imageItem.innerHTML; // Récupération d'image
      let colorValue = colors.value; //Récupération de couleur choisie
      let quantityValue = document.querySelector("#quantity").value; //Récupération de quantité

      // Vérifier que la coleur et la quantité sont bien saisi
      if (colorValue.length >= 15) {
        alert("Veuillez choisir votre coleur"); // Alert
      } else if (quantityValue < 1 || quantityValue > 100) {
        alert("Veuillez choisir une quantité entre 1 et 100");
      }
      //la couleur et la quantité sont valides, alors
      else {
        // Création de produit choisi
        let choiceProduct = {
          nameOfProduct: titleValue,
          imageOfProduct: imageItemValue,
          idOfProduct: productId,
          colorsOfProduct: colorValue,
          quantityOfProduct: Number(quantityValue),
        };

        // Recupérer le panier si elle est dans le localStorage et le convertir en format JAVASCRIPT
        let productInLocalstorage = JSON.parse(
          localStorage.getItem("tabBasket")
        );

        // Vérifier si le produit est déjà enregistré dans le LocalStorage
        if (productInLocalstorage) {
          // Déclaration de variable qui va chercher l'ID + la couleur du produit enregistré dans le LocalStorage
          const getProductInLocalstorage = productInLocalstorage.find(
            (p) =>
              p.idOfProduct === choiceProduct.idOfProduct &&
              p.colorsOfProduct === choiceProduct.colorsOfProduct
          );

          /******* Si l'ID + la Couleur de produit cliqué et du produit enregistré sont Identique,
          alors adition leur quantité *******/
          if (getProductInLocalstorage) {
            getProductInLocalstorage.quantityOfProduct +=
              choiceProduct.quantityOfProduct;
            localStorage.setItem(
              "tabBasket",
              JSON.stringify(productInLocalstorage)
            );
            alert("Le panier est à jour");
            document.location.reload();
            return;
          }
          // Sinon (l'ID + La couleur ne sont pas identique), et donc faire push de ce produit cliqué
          else {
            productInLocalstorage.push(choiceProduct);
            localStorage.setItem(
              "tabBasket",
              JSON.stringify(productInLocalstorage)
            );
            alert("L'article a été ajouté dans le panier");
            document.location.reload();
          }
        }
        // Sinon (Le produit cliqué n'est pas dans le LocalStorage), alors
        else {
          productInLocalstorage = [];
          productInLocalstorage.push(choiceProduct);
          localStorage.setItem(
            "tabBasket",
            JSON.stringify(productInLocalstorage)
          );
          alert("L'article a été ajouté dans le panier");
          window.location.reload();
        }
      }
    });
  })
);
