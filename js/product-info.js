  var product = {};

  function showImagesGallery(array){
  
      let htmlContentToAppend = "";
  
      for(let i = 0; i < array.length; i++){
          let imageSrc = array[i];
  
          htmlContentToAppend += `
          <div class="col-lg-3 col-md-4 col-6">
              <div class="d-block mb-4 h-100">
                  <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
              </div>
          </div>
          `
  
          document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
      }
  }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
      product = resultObj.data;

      let productNameHTML  = document.getElementById("productName");
      let productDescriptionHTML = document.getElementById("productDescription");
      let productCostHTML = document.getElementById("productCost");
      let productCurrencyHTML = document.getElementById("productCurrency");
      let productSoldCountHTML = document.getElementById("productSoldCount");
      let productCategoriaHTML = document.getElementById("productCategoria");

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCostHTML.innerHTML = product.cost;
      productCurrencyHTML.innerHTML = product.currency;
      productSoldCountHTML.innerHTML = product.soldCount
      productCategoriaHTML.innerHTML = product.category;

      //Muestro las imagenes en forma de galería
      showImagesGallery(product.images);
  }

});
document.getElementById("comment").addEventListener("click", function(){
    let productCommentPuntuacionHTML  = document.getElementById("txtcomentario");
    productCommentPuntuacionHTML.innerHTML += comment;
    productCommentPuntuacionHTML.innerHTML += "Puntuación"+puntuacion;
});


getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
  if (resultObj.status === "ok")
  {
    productComments = resultObj.data;

    let productCommentHTML  = document.getElementById("comentariosanteriores");
    productCommentHTML = "";
    productCommentHTML.innerHTML += productComments.score;
    productCommentHTML.innerHTML += productComments.description;
    productCommentHTML.innerHTML += productComments.user;
    productCommentHTML.innerHTML += productComments.dateTime;

}

});
});