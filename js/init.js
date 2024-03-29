const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

function limpiarUsuario(){
  localStorage.clear();
  sessionStorage.clear();
}

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  if (localStorage.getItem("usuario")){
   let carge=localStorage.getItem("usuario");
   let cargar=document.getElementById("Usuario");
   cargar.innerHTML+=  `
    <div class="dropdown">
    <button class="dropdown-toggle btn btn-success" type="button" id="nameUsuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    </button>
    <div class="dropdown-menu" aria-labelledby="`+ carge +`">
      <a class="dropdown-item" href="cart.html">`+ "Mi carrito" +`</a>
      <a class="dropdown-item" href="my-profile.html">`+ "Mi perfil" +`</a>
      <a class="dropdown-item" onclick="limpiarUsuario();" href="login.html">`+ "Cerrar sesión" +`</a>
    </div>
  </div>
   `
   let add=document.getElementById("nameUsuario");
   add.innerHTML+=carge;
  
  }
});

        