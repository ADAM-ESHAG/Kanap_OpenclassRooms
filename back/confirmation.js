// -------Search_params dans le URL de page confirmation pour récupérer le numéro de commande--------
const search_params = new URLSearchParams(window.location.search);
const commandetId = search_params.get("commande");

// Insertion numero de commande dans le DOM
let commandeNumber = document.querySelector("#orderId");
commandeNumber.textContent = commandetId;
