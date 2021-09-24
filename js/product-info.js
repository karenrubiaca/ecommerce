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
      let prodRel=product.relatedProducts;

  getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
      prod=resultObj.data;
     let cantProdRel=0;
     let prodRelAdd="";
      for(let indice of prodRel){
        let rel=prod[indice];
        cantProdRel+=1;
        
        prodRelAdd+= `    
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <img src="` + rel.imgSrc + ` style="width:100%">
        <h4 class="mb-1">`+ rel.name +`</h4>
        <p class="price">`+rel.currency+" "+ rel.cost + `</p>
        <p class="mb-1">` +" "+ rel.description + `</p> </a>
        `
        if ((cantProdRel%4)===1){
          document.getElementById("col1").innerHTML=prodRelAdd;
         }
        else if ((cantProdRel%4)===2){
        document.getElementById("col2").innerHTML=prodRelAdd;
         }
        else if ((cantProdRel%4)===3){
          document.getElementById("col3").innerHTML=prodRelAdd;
         }
        else if ((cantProdRel%4)===0){
          document.getElementById("col4").innerHTML=prodRelAdd;
         }
         prodRelAdd="";
      }//end for
        
        //<p><button>Add to Cart</button></p>

       

       }

{/* <div class="row">

<div class="col-6">
  <div class="row">
    <div class="card col-6">
      <img class="img-fluid" src="img.jpg" alt="alternative">
    </div>
    <div class="card col-6">
      <h3>Hola</h3>
    </div>
  </div>
</div>

<div class="col-6">
  <div class="row">
    <div class="card col-6">
      <img class="img-fluid" src="img.jpg" alt="alternative">
    </div>
    <div class="card col-6">
      <h3>Hola</h3>
    </div>
  </div>
</div>

</div> */}


  });//end PRODUCTS_URL               

  }
  });//end PRODUCT_INFO_URL
 
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
 });//end registro

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
    }//fin for
     
     
  }
 });//end PRODUCT_INFO_COMMENTS_URL
});//end addEventListener


