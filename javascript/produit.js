//récupération des données pour ma page produit
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Extraire l'ID 
const urlSearchParams = new URLSearchParams(queryString_url_id)
console.log(urlSearchParams);

const camId = urlSearchParams.get("id");
console.log(camId);

const productApi = 'http://localhost:3000/api/cameras';

function productFetch() {
    fetch(productApi + "/" + camId)
    .then(res => res.json()) 
    .catch((error) => console.log(error))
    .then((data) => {
        if (data){
            showProduct(data)
        }
    });
}

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
        <select name="optionProduit" id="optionProduit">
        <option value='nomChoix'>Lentilles</option>
        <option value='lentille1'>${camera.lenses}</option>
        <option value='lentille2'>${camera.lenses}</option>
        <option value='lentille3'>${camera.lenses}</option></select>
        </form>
      <button class="btn-envoyer">Commander l'article</button>
      </article>`;
}
productFetch();

// const lenses = document.getElementById("optionProduit")

// function init(data) {
// 	document.querySelector("#optionProduit").innerHTML = `<form>
//     <label for="optionProduit">Lentilles</label>
//     <select name="optionProduit" id="optionProduit"></select>
//     </form>`;
//   data.forEach(data => {
//     const $opt =  document.createElement("option");
//     $opt.value = data.value;
//     $opt.textContent = data.label;
//     $select.appendChild($opt);
// 	})
// }

// init(data);


// showProduct().then(data => {
//     let option;
//     Object.entries(data.showProduct).forEach(lenses => {
//         option = document.createElement("option");
//         option.text = lenses[0];
        
//     });
// } );



//----------------------------------------
// // Useful functions to have

// // Function to talk to the server and return a bunch of products
// async function getAllProducts() {
//     var products = [];
//     var cards = [];
//     const errorMessage = "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";
    
//     await fetch('http://localhost:3000/api/cameras', {
//         method: 'GET',
//         mode: 'cors'
//     })
//     .then(response => response.json())
//     .then(data => products = data)
//     .catch(_ => cards.push(errorMessage));

//     if (products.length > 0 && cards.length < 1) {
//         for (const index in products) {
//             var product = products[index];
        
//             var productID = product.id;
//             var productName = product.name;
//             var productImageURL = product.imageURL;
//             var productPrice = product.price;
//             var productDescription = product.description;

//             var card = `
//                 <div id=${productID}>
//                     <div class="card bg-dark" style="width: 18rem;">
//                         <img class="card-img-top" src=${productImageURL} alt="Product Image">
//                         <div class="card-body text-white">
//                             <h5 class="card-title">${productName}</h5>
//                             <p class="card-text">${productDescription}</p>
//                             <br />
//                             <p><strong>Price: $</strong> ${productPrice}</p>
//                         </div>
//                         <div class="card-footer bg-transparent text-center row">
//                             <button type="button" class="btn btn-outline-warning btn-sm col" id="buy-btn">Buy Product</button>
//                             <button type="button" class="btn btn-outline-warning btn-sm col offset-md-1" id="edit-btn">Edit Product</button>
//                         </div>
//                     </div>
//                 </div>
//             `;

//             cards.push(card);
//         }
//     } else if (products.length < 1 && cards.length < 1) {
//         cards.push(errorMessage);
//     }

//     return cards;
// }

// Create a new product
// async function createNewProduct(product) {
//     var result = false;

//     await fetch('http://localhost:3000/api/cameras', {
//         method: 'POST',
//         body: JSON.stringify(product),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(_ => result = true)
//     .catch(_ => result = false);

//     return result;
// }

// // Update product
// async function updateProduct(camId, product) {
//     var result = false;

//     await fetch(`http://localhost:3000/api/cameras/${id}`, {
//         method: 'POST',
//         body: JSON.stringify(product),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(_ => result = true)
//     .catch(_ => result = false);

//     return result;
// }

// // Get a single product
// async function getProduct(id) {
//     var products = [];
    
//     await fetch('http://localhost:3000/api/cameras', {
//         method: 'GET',
//         mode: 'cors'
//     })
//     .then(response => response.json())
//     .then(data => products = data)
//     .catch(_ => {});

//     if (products.length > 0) {
//         for (const index in products) {
//             var product = products[index];

//             if (product.id == id) {
//                 console.log("Product match!");
//                 return {
//                     "name": product.name,
//                     "imageURL": product.imageURL,
//                     "price": product.price,
//                     "description": product.description
//                 };
//             }
//         }
//     }

//     return {};
// }

//Afficher le produit sélectionné par l'id (objet) avec .find()
//const idProduitSelectionner = url.find( element => element._id === _id);
//console.log(idProduitSelectionner)
