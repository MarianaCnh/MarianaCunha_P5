//récupération des données pour ma page produit
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Extraire l'ID 
const urlSearchParams = new URLSearchParams(queryString_url_id)
console.log(urlSearchParams);

const camId = urlSearchParams.get("id");
console.log(camId);

const productApi = 'http://localhost:3000/api/cameras';

// fonction qui contient le fetch pour récupérer les données de l'API et avoir l'identifiant du produit dans URL
function productFetch() {
    fetch(productApi + "/" + camId)
    .then(res => res.json()) 
    .catch((error) => console.log(error))
    .then((data) => {
        if (data){
            showProduct(data);
            //à partir du fetch je permet au bouton de push les données dans le local storage
            const btn = document.querySelector(".btn-panier");
            btn.addEventListener("click",(ev) => {
            ev.preventDefault();
            ajoutDuProduit(data);
      });
        }
    });
}

// boucle pour itérer la page produit
function showProduct(camera) {
    document.querySelector(
        "#cam"
      ).innerHTML = `<article class="cardProduct">
      <img src="${camera.imageUrl}" class="img">
      <p class="name">${camera.name}</p>
      <p class="description">${camera.description}</p>
      <p class="price">${camera.price}€</p>
      <form>
        <label for="optionProduit"></label>
        <select name="optionProduit" id="optionProduit">${this.showOptionLenses(camera.lenses)}
        </select>
        </form>
        <button type="submit" class="btn-panier">Commander ici</button>
      </article>`;
}
productFetch();



//Boucle for et itération pour avoir les options de lentilles
function showOptionLenses(lenses) {
    let optionLenses = '';
    for (let i = 0, size = lenses.length; i < size; i++) {
        optionLenses += `<option value="${(lenses[i])}">${(lenses[i])}</option>`;
    }
    return optionLenses;
};

function ajoutDuProduit(camera){

    let monPanier = [];
    let monLocal = JSON.parse(localStorage.getItem("monLocal"));
    const optionsLentilles = document.querySelector("#optionProduit");
    const choixLenses = optionsLentilles.value;

    //objet avec chaque propriété de produit
 let camerasProduit = {
    _id : camera._id,
    name : camera.name,
    price : camera.price,
    qte : 1,
    option : choixLenses,
};
// push dans mon local storage pour récup les info de mon objet
if (monLocal == null) {
    monPanier.push(camerasProduit);
    localStorage.setItem("monLocal", JSON.stringify(monPanier));
}

};




// actualiserPanier = () => {
//     console.log(creationItem);
// }
// var bouton = document.getElementsByClassName('.btn-panier');

// for(var i = 0; i < bouton.length; i++) {
//     bouton[i].addEventListener("click",function(){
//         let key = this.getAttribute('key');
//         creationItem[key].quantite++;
//         actualiserPanier();
//         return false;
//     })
// };

// const envoyerPanier = document.querySelector(".btn-panier");

// envoyerPanier.addEventListener("click", (event) => {
//     event.preventDefault();

//     const choixProduit = camId.value;
//     console.log(choixProduit);

//     let optionProduit = {
        
//     }
// })
