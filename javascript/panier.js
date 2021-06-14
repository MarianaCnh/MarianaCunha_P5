//J'appelle mon localstorage de la page produit
let panier = JSON.parse(localStorage.getItem("panier"));

//---------affichage des produits du panier
//sélection de l'id pour injecter le code HTML 
const positionElement = document.querySelector("#tableproduit")

let produitPanier = [];
let totalPrix = 0;
let autreTotal = 0;
let plus = document.querySelectorAll(".btn-add");
let qteItem = document.querySelectorAll("inputqte");



//Si le panier est vide il faut l'afficher 
if (panier === null || panier == 0){
    const panierVide = `
    <div>Le panier est vide</div>`;
    positionElement.innerHTML = panierVide;
} else {
    //si le panier n'est pas vide il faut afficher les produits, j'utilise une boucle for avec itérations pour cela 
    for (k = 0; k < panier.length; k++) {
        produitPanier = produitPanier + `
        <table id="tableproduit">
            <tr>
                <td id="nomproduit">${panier[k].name}
                Option :${panier[k].option}
                ${panier[k].price}€
                <button class="btn-remove">-</button>
                <span class="inputqte">${panier[k].qte}</span>
                <button class="btn-add">+</button>
                <button class="btn-supprimer"><i class="fas fa-trash-alt"></i></button></td> </tr> 
            </table> `; 
            positionElement.innerHTML = produitPanier;
            
    }
    };

    
    function btnAdd(){

        const boutonAdd = document.getElementsByClassName(".btn-add");
        
        for(let i = 0; i < boutonAdd.length; i++){
        boutonAdd.addEventListener("click", function(event){
            event.preventDefault();
            panier.qte++

            localStorage.setItem("panier", JSON.stringify(panier));
        });
    }
    }
    btnAdd();
    

    // Si le panier dans le localStorage est strictement égal au panier alors il incrémente dans le localStorage

 function supprimerBouton(){
    // Supprimer les articles 
    let btnSupp = document.querySelectorAll(".btn-supprimer");
    for(let l = 0; l < btnSupp.length; l++){
        btnSupp[l].addEventListener("click", (event) =>{
            event.preventDefault();
            //prendre l'option du produit qui va être supprimer
            let idSupp = panier[l].option;
            //j'utilise la méthode filter pour supprimer l'élément où btn supprimer a été cliqué
            panier = panier.filter(el => el.option !== idSupp);
            //je relie le bouton à mon localstorage pour qu'il sâche ce que je veux supprimer
            localStorage.setItem("panier", JSON.stringify(panier));
            //retour sur la page panier pour que le message de panier vide s'affiche
            window.location.href = "panier.html";
            //quand je clique sur le bouton le localstorage se vide aussi
        })
    }
    };

supprimerBouton();


function calculQuantiteProduit(){
JSON.parse(localStorage.getItem("panier")).forEach((panier)=>{
    autreTotal += panier.qte;
    console.log(autreTotal)
});
let quantiteTotal = `<div>nombre total de produit : ${autreTotal}</div>`;
positionElement.insertAdjacentHTML("beforeend", quantiteTotal);
};
calculQuantiteProduit();

function calculTotalPrix() {  
JSON.parse(localStorage.getItem("panier")).forEach((panier)=>{
    totalPrix += panier.price *= panier.qte;
    console.log(totalPrix)
});

let prixTotal = `<div>Le prix total est de : ${totalPrix}</div>`;
positionElement.insertAdjacentHTML("beforeend", prixTotal);

};
calculTotalPrix()


// --- FORMULAIRE ---

const afficherFormulaireHtml = () => {
    //Sélection élément du DOM pour positionner le formulaire 
    const afficherElement = document.querySelector("#tableproduit");
    
    const structureFormulaire = `
    <div class="formulaireCommande">
            <h2 class="titreFormulaire">Remplissez le formulaire pour valider votre commande</h2>
        
            <form class="contenuformulaire">
                
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" required>

                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required>
                

                <label for="adresse" class="adresse">Adresse :</label>
                <textarea id="adresse" name="adresse" required></textarea>

                <label for="ville">Ville :</label>
                <input type="text" id="ville" name="ville" required>

                <label for="codepostal">Code postal :</label>
                <input type="text" id="codepostal" name="codepostal" required>

                <label for="email">E-mail :</label>
                <input type="text" id="email" name="email" required>

                <button id="envoyerFormulaire" type="submit" name="envoyerFormulaire">
                    Confirmation de la commande
                </button>
            </form>
        </div>`;

        //injection HTML 
        afficherElement.insertAdjacentHTML("afterend", structureFormulaire);
};

//Affichage du formulaire
afficherFormulaireHtml();

//Je sélectionne le bouton pour envoyer le formulaire 
const btnEnvoyerForm = document.querySelector("#envoyerFormulaire");

// Un addEventListener pour que au click mon bouton envoye les données du formulaire
btnEnvoyerForm.addEventListener("click", (e) => {
    e.preventDefault();

    //je récupére les valeurs du formulaire
    const formulaireValues = {
        prenom :document.querySelector("#prenom").value,
        nom : document.querySelector("#nom").value,
        adresse : document.querySelector("#adresse").value,
        ville : document.querySelector("#ville").value,
        codePostal : document.querySelector("#codepostal").value,
        email : document.querySelector("#email").value
    }

    const textAlert = (value) =>{
        return `${value}: Les chiffres et symboles ne sont pas autorisé \n Il ne faut pas dépasser 20 caractères, minimum 3 caractères`
    }

    const regExPrenomNomVille = (value) =>{
        return /^[A-Za-z]{3,20}$/.test(value)
    
    }

    function prenomControle(){
    //contrôle du prénom avec les regex
    const lePrenom = formulaireValues.prenom;
    if(regExPrenomNomVille(lePrenom)){
        return true;
    }else{
        alert(textAlert("PRENOM"));
        return false;
    };
};

function nomControle(){
    //contrôle du nom avec les regex
    const leNom = formulaireValues.nom;
    if(regExPrenomNomVille(leNom)){
        return true;
    }else{
        alert(textAlert("NOM"));
        return false;
    };
};
function villeControle(){
    //contrôle de la ville avec les regex
    const laVille = formulaireValues.ville;
    if(regExPrenomNomVille(laVille)){
        return true;
    }else{
        alert(textAlert("VILLE"));
        return false;
    };
};
    
//Condition pour que le formulaire soit pris en compte dans le localStorage
    if(prenomControle() && nomControle() && villeControle()){
        //Mettre l'objet formulaireValues dans le localStorage
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    }else {
        alert("Veuillez bien remplir le formulaire");
    }

//je met les values du formulaire avec les produits sélectionnées dans un objet pour envoyer au serveur 
const toutEnvoyer = {
    panier,
    formulaireValues
}
});


