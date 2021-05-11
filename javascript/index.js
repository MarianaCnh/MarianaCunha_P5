const url = 'http://localhost:3000/api/cameras'; // ma constante avec l'API

// Ma fonction avec mon fetch pour faire appel aux données de l'API
function initApp() {
    fetch(url)
    .then(res => res.json()) 
    .catch((error) => console.log(error))
    .then((data) => {
        if (data){
            showCam(data)
        }
    });
}

// ma boucle pour afficher les éléments des produits sur ma page index grâce à ma fonction initApp
function showCam(cameraArray) {
    for (let i = 0; i < cameraArray.length; i++) {
      let camera = cameraArray[i];
      document.querySelector(
        ".sectionProduct"
      ).innerHTML += `<article class="cardProduct"><a href="./product.html?id=${camera._id}">
      <img src="${camera.imageUrl}" class="img">
      <p class="name">${camera.name}</p>
      <p class="description">${camera.description}</p>
      <p class="price">${camera.price}€</p>
      <button class="boutoncommande">Commander l'article</button>
      </a></article>`;
      }
}
initApp();



// const url = 'http://localhost:3000/api/cameras';

// //créer une requête 
// let requete = new XMLHttpRequest();// créer un objet
// requete.open('GET', url); //premier paramétre GET / Post
// requete.responseType = 'json'; // Nous attendons du JSON
// requete.send(); // Nous envoyons notre requête 

// // dès qu'on reçoit une réponse, cette fonction est executée
// requete.onload = function(){
//   if (requete.readyState === XMLHttpRequest.DONE) {
//     if(requete.status === 200) {
//       let reponse = requete.response; //on stock la réponse
//       console.log(reponse);
//     }
//   }
// }
// showCam(reponse)
