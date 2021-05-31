let monLocal = JSON.parse(localStorage.getItem("monLocal"));
console.log(monLocal);

//---------affichage des produits du panier
//sélection de la classe pour injecter le code HTML 
const positionElement = document.querySelector("#nomproduit")

//Si le panier est vide il faut l'afficher 
if (monLocal === null){
    const panierVide = `
    <div>Le panier est vide</div>`;
    positionElement.innerHTML = panierVide;
} else {
    //si le panier n'est pas vide il faut afficher les produits
    let produitPanier = [];

    for (k = 0; k < monLocal.length; k++) {
        produitPanier = produitPanier + `
        <table>
            <tr>
            <th>Nom</th>
                <td id="nomproduit">${monLocal[k].name} Option :${monLocal[k].option}</td>
            </tr>
            <tr>
            <th>Quantité</th>
                <td>${monLocal[k].qte}</td>
            </tr>
            <tr>
            <th>Prix</th>
                <td>${monLocal[k].price}</td>
            </tr>
            </table>`;
    }
    if(k === monLocal.length){
    //injection html dans le panier
    positionElement.innerHTML = produitPanier;
    }
    };

