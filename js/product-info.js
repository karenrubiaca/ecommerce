function respaldoComentario(comment,puntuacion.value){  

    if (correo.trim()==="" || clave.trim()===""){ //el dato recibido no debe ser vacío. 
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
      let productCountHTML = document.getElementById("productCount");
      let productCriteriaHTML = document.getElementById("productCriteria");
  
      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCountHTML.innerHTML = product.productCount;
      productCriteriaHTML.innerHTML = product.productCriteria;

      //Muestro las imagenes en forma de galería
      showImagesGallery(product.images);
  }
});

getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
  if (resultObj.status === "ok")
  {
    product = resultObj.data;

    let productScoreHTML  = document.getElementById("productScore");
    let productDescriptionHTML = document.getElementById("productDescription");
    let productUserHTML = document.getElementById("productUser");
    let productDateTimeHTML = document.getElementById("productDateTime");

    productScoreHTML.innerHTML = product.score;
    productDescriptionHTML.innerHTML = product.description;
    productUserHTML.innerHTML = product.user;
    productDateTimeHTML.innerHTML = product.dateTime;

}
});
});
