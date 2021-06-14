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
    document.querySelector("#cam").innerHTML = `<article class="cardProduct">
      <img src="${camera.imageUrl}" class="img">
      <p class="name">${camera.name}</p>
      <p class="description">${camera.description}</p>
      <p class="price">${camera.price / 100}€</p>
      <form>
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

function getPanier() {
   return JSON.parse(localStorage.getItem("panier")) || [];
}



function ajoutDuProduit(camera){

  qtePlace = document.querySelector(".inputqte");
  const choixQte = qtePlace;
  let autreItem = true;

  const optionsLentilles = document.querySelector("#optionProduit");
  const choixLenses = optionsLentilles.value;

    //objet avec chaque propriété de produit
  var camerasProduit = {
    _id : camera._id,
    name : camera.name,
    price : camera.price / 100,
    qte : 1,
    option : choixLenses,
  };
  
  // si le panier est vide alors il doit ajouté un produit dans le tableau
  if (panier == null){
    panier = []
}else {
  product = JSON.parse(localStorage.getItem('product'));

//Pour chaque produit du même id et même option il faut augmenté la quantité
  panier.forEach((produit) => {
    if (camera._id === camerasProduit._id && choixLenses === produit.option) {
      camerasProduit.qte = parseInt(produit.qte) + parseInt(choixQte);
      produit.qte ++
      autreItem = false;
    }
  });

}

  if (autreItem)panier.push(camerasProduit);
  localStorage.setItem("panier", JSON.stringify(panier));


// // push dans mon local storage pour récup les info de mon objet
// panier.push(camerasProduit);
// localStorage.setItem("panier", JSON.stringify(panier));
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

//     
// function checklength(camerasProduit, cam) {
//   if (cam.length === 0) {
//     camerasProduit = 1;
//   } else {
//     sameCam(camerasProduit, cam);
//   }
// }

//Si il y a plus d'une camera dans le tableau, vérifie qu'ils sont identique
// function sameCam(camerasProduit, cam) {
//     for (i = 0; i < cam.length; i++) {
//       if (
//         camerasProduit._id === cam[i]._id &&
//         camerasProduit.option === cam[i].option
//       ) {
//         cam[i] += 1;
//         camerasProduit = cam[i];
//       } else {
//         camerasProduit = 1;
//       }
//     }
//     checklength(camerasProduit, cam);
//   };