let url = "http://localhost:3000/api/products";
fetch(url).then((response) => response.json().then((data) => {
    let affichage = '';
    for(let product of data) {
        affichage += `<a href="./product.html?id=42"><article id=${product._id}><img src=${product.imageUrl} alt=${product.altTxt}>
        <h3>${product.name}</h3><p>${product.description}</p><p>${`<strong>${product.price}</strong> Є`}</p>
        </article></a>`;
    }
    document.querySelector("#items").innerHTML = affichage;
}));