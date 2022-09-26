const search_params = new URLSearchParams(window.location.search);
const productId = search_params.get("id");
// Affiche sur le console les détails du produit cliqué à partir de la page d'accueil 
fetch(`http://localhost:3000/api/products/${productId}`).then((response) =>
  response.json().then((data) => {
    console.log(data);
    document.querySelector(
        ".item__img"
    ).innerHTML = `<img src=${data.imageUrl} alt=${data.altTxt} />`;
    document.getElementById("title").innerHTML = `${data.name}`;
    document.getElementById("price").innerHTML = `${data.price}`;
    document.getElementById("description").innerHTML = `${data.description}`;
    document.querySelector(
      "#colors"
    ).innerHTML = `<option>--SVP, choisissez une couleur --</option>`;
    for (let i = 0; i < data.colors.length; i++) {
      let colors = document.querySelector(
        "#colors"
      );
      colors.innerHTML += `<option value=${data.colors[i]}>${data.colors[i]}</option>`;
    }
  })
);
