//J'appelle mon localstorage de la page produit
let panier = JSON.parse(localStorage.getItem("panier"));

//---------affichage des produits du panier
//sélection de la classe pour injecter le code HTML 
const positionElement = document.querySelector("#nomproduit")

let produitPanier = [];

//Si le panier est vide il faut l'afficher 
if (panier === null || panier == 0){
    const panierVide = `
    <div>Le panier est vide</div>`;
    positionElement.innerHTML = panierVide;
} else {
    //si le panier n'est pas vide il faut afficher les produits, j'utilise une boucle for avec itérations pour cela 
    for (k = 0; k < panier.length; k++) {
        produitPanier = produitPanier + `
        <table>
            <tr>
                <td id="nomproduit">${panier[k].name}
                Option :${panier[k].option}
                ${panier[k].qte}
                ${panier[k].price}</td>
                <button class="btn-supprimer"><i class="fas fa-trash-alt"></i></button>
            </tr>
            </table>`;
    }
    if(k === panier.length){
    //injecter l'html dans le panier
    positionElement.innerHTML = produitPanier;
    }
    };

    // Supprimer les articles 
    let btnSupp = document.querySelectorAll(".btn-supprimer");
for(let l = 0; l < btnSupp.length; l++){
    btnSupp[l].addEventListener("click", (event) =>{
        event.preventDefault();
        //prendre l'id du produit qui va être supprimer
        let idSupp = panier[l]._id;
        //j'utilise la méthode filter pour supprimer l'élément où btn supprimer a été cliqué
        panier = panier.filter( el => el._id !== idSupp);
        //je relie le bouton à mon localstorage pour qu'il sâche ce que je veux supprimer
        localStorage.setItem("panier", JSON.stringify(panier));
        //retour sur la page panier pour que le message de panier vide s'affiche
        window.location.href = "panier.html";
        //quand je clique sur le bouton le localstorage se vide aussi
        localStorage.clear();
    })

}

// let totalPrix = 0;
//       JSON.parse(localStorage.getItem("panier")).forEach((camera)=>{
//       	totalPrix += camera.price / 100;
//           console.log(totalPrix)
//       });




