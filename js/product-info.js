/*function respaldoComentario(comment,puntuacion){  

    if (comment.trim()==="" || puntuacion.trim()===""){ //el dato recibido no debe ser vacío. 
  //ni ser espacios en blanco.
  }    
  else{

  sessionStorage.setItem("comentario", comment.trim());//setItem almacena el dato en la posición "usuario"
  let commenta=sessionStorage.getItem("comentario");
  let comentarioanterior=document.getElementById("comentariosanteriores");
  comentarioanterior.innerHTML+=
  document.getElementById("txtcomentario").value ="";
  window.location="products-info.html";
  
  }
  }
*/
  var product = {};
/*
  function showProductsList(products){

    let htmlContentToAppend = "";
    for(let i = 0; i < products.length; i++){
        let product = products[i];

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` +" "+ product.description + `</p>
                        <p class="mb-1">` + "Costo:"+" "+product.currency+" "+ product.cost + `</p>
                    </div>
                </div>
            </a>
            `
// ' + ' puede cambiarse por ${} 
}

document.getElementById("productRelacionados").innerHTML = htmlContentToAppend;

}*/

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
      let productRelacionadosHTML=document.getElementById("productRelacionados");

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCostHTML.innerHTML = product.cost;
      productCurrencyHTML.innerHTML = product.currency;
      productSoldCountHTML.innerHTML = product.soldCount
      productCategoriaHTML.innerHTML = product.category;

      //Muestro las imagenes en forma de galería
      showImagesGallery(product.images);
      productRelacionadosHTML.innerHTML = product.relatedProducts;
  }
});

getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
  if (resultObj.status === "ok")
  {
    productComment = resultObj.data;

    let productCommentScoreHTML  = document.getElementById("productCommentScore");
    let productCommentDescriptionHTML = document.getElementById("productCommentDescription");
    let productCommentUserHTML = document.getElementById("productCommentUser");
    let productCommentDateTimeHTML = document.getElementById("productCommentDateTime");

    productCommentScoreHTML.innerHTML = productComments.score;
    productCommentDescriptionHTML.innerHTML = productComments.description;
    productCommentUserHTML.innerHTML = productComments.user;
    productCommentDateTimeHTML.innerHTML = productComments.dateTime;

}
});
});
