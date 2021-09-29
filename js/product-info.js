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
  
      let cont=0;
      for(let i = 0; i < array.length; i++){
          let imageSrc = array[i];
          cont+=1;
          if (cont==1){
            document.getElementById("carr1").innerHTML+= `
              <img src="` + imageSrc + `" class="d-block w-100" alt="a">    
          `          }
          else {
            document.getElementById("carr2").innerHTML+= `
            <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt="a"></div>
            `
            }
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
        <a href="product-info.html" class="list-group-item list-group-item-action" style>
        <img src="` + rel.imgSrc + `" alt="` + rel.description + `" class="img-thumbnail" >
        <h4 class="mb-1">`+ rel.name +`</h4>
        <p class="price">`+rel.currency+" "+ rel.cost + `</p>
       </a>
        ` 
        if ((cantProdRel%2)===1){
          document.getElementById("col1").innerHTML=prodRelAdd;
         }
        else if ((cantProdRel%2)===0){
        document.getElementById("col2").innerHTML=prodRelAdd;
         }
         prodRelAdd="";
      }//end for

       }


  });//end PRODUCTS_URL               

  }
  });//end PRODUCT_INFO_URL

  function addComment(event){
  event.preventDefault();
  let coment=document.getElementById("txtcomentario").value;

  let productCommentPuntuacionHTML  = document.getElementById("productComments");
   // let puntuacionNewHTML=document.getElementById("puntuacion");
  if (coment.trim()!==""){
  let puntuacion=document.getElementById("star").value;
  addStar(productCommentPuntuacionHTML,puntuacion);    
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
  productCommentPuntuacionHTML.innerHTML+= "<hr>";
  document.getElementById('myform').reset();
  }
 }//);//end registro

 myform = document.getElementById('myform');
 myform.addEventListener("submit", addComment);

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


