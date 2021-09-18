  var product = {};

  function addStar(array,puntuacion){
    let star=[];
    for(let i=1;i<=5;i++){
      if (i<=puntuacion){
        star.push('<span class="fa fa-star checked"></span>');
      }
      else {
        star.push('<span class="fa fa-star"></span>');
      }
     }//fin segundo for
     
     for(let i=0;i<5;i++){//agrego las estrellas
     array.innerHTML += star[i];}
  }


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

  document.getElementById("Registro").addEventListener("click", function(e){
    let coment=document.getElementById("txtcomentario").value;

    let productCommentPuntuacionHTML  = document.getElementById("productComments");
   // let puntuacionNewHTML=document.getElementById("puntuacion");
    if (coment.trim()!=="")
   {let puntuacion=document.getElementById("star").value;
   addStar(productCommentPuntuacionHTML,puntuacion)
   
    

  let user=sessionStorage.getItem("usuario");
  productCommentPuntuacionHTML.innerHTML += "<br>"+user+ "<br>";
  productCommentPuntuacionHTML.innerHTML += coment+ " ";
 var d = new Date();
 var year = d.getFullYear();
 var month = d.getMonth();//mes
 var day = d.getDate();//dia
 var hours = d.getHours();//hora
 var minutes = d.getMinutes();//minuto
 var seconds = d.getSeconds();//segundo
  productCommentPuntuacionHTML.innerHTML+= year +"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds+ "<br>"+ "<br>";
  document.getElementById('myform').reset();
  productCommentPuntuacionHTML.innerHTML+= "<hr>";

  }
});

 getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
  if (resultObj.status === "ok")
  { 
    productComments = resultObj.data;
    let productCommentHTML  = document.getElementById("productComments");
    for(let i = 0; i < productComments.length; i++){
     let product = productComments[i];
     addStar(productCommentHTML,product.score);
 
     
      //agrego el usuario, descripción y fecha
     productCommentHTML.innerHTML +="<br>";
     productCommentHTML.innerHTML += product.user+ "<br>";
     productCommentHTML.innerHTML += product.description+ " ";
     productCommentHTML.innerHTML += product.dateTime+ "<br>"+ "<hr>"; 
     star=[];
    }//fin for
     
     
  }

 });
});
