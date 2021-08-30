var products = [];
var camp="cost";
CountMin=0;
CountMax=0;
const ORDER_ASC_BY_COST = "PrecioAsc.";
const ORDER_DES_BY_COST = "PrecioDes.";
const ORDER_DES_PROD_SOLDCOUNT = "Relevancia";
const ORDER_PROD_RANGE= "rangeFilterCount";
let criteria="ORDER_ASC_BY_COST";
function sortAndShowProducts(criteria, array){
    if (criteria === ORDER_ASC_BY_COST) //ascendente por precio
    {
        array.sort(function(a, b)  {
            if ( a[camp] < b[camp] ){ return -1; }
            if ( a[camp] > b[camp] ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DES_BY_COST){//descendente por precio
        array.sort(function(a, b)  {
            if ( a[camp] > b[camp] ){ return -1; }
            if ( a[camp] < b[camp] ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DES_PROD_SOLDCOUNT){//descendiente por cantidad
        array.sort(function(a, b)  {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    showProductsList();
}

function sortAndShowProductsRange(criteria, array,min,max){
     
      if (criteria === ORDER_PROD_RANGE){
        array.sort(function(a)  {
            if ( (a[cost] <= max)&&(a[cost] >= min) ){ return -1; }
           
            return 0;
        });
     }
    

    showProductsList();
}

/*
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DES_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DES_PROD_SOLDCOUNT){
        result = 
        array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
*/
function showProductsList(){

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
   
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
  
}

//const estaEnRango=(valor,valorInicio,valorFinal)=>{
    //return ((valor>=valorInicio)&&(valor<=valorFinal));
//}
function filtradoRango(){
    minCount=document.getElementById("rangeFilterCountMinProd").value;
    maxCount=document.getElementById("rangeFilterCountMaxProd").value;
    criteria=ORDER_PROD_RANGE;
    sortAndShowProductsRange(criteria, products,minCount,maxCount)
   
           // document.getElementById("prod-list-container").innerHTML=prodRang;

}
function limpiarRango(){

    document.getElementById("clearRangeFilterProd").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount=0;
        maxCount=0;
        showCategoriesList();
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
   showSpinner();
   getJSONData(PRODUCTS_URL).then(function(resultObj){
       if (resultObj.status === "ok")
       {
           products = resultObj.data;
           //Muestro los productos
           showProductsList();
       }
       hideSpinner();
   });
   document.getElementById("sortProdAsc").addEventListener("click", function(){
       criteria=ORDER_ASC_BY_COST;
    sortAndShowProducts(criteria, products);
});

document.getElementById("sortProdDesc").addEventListener("click", function(){
    criteria=ORDER_DES_BY_COST;
    sortAndShowProducts(criteria, products);
});

document.getElementById("sortByProdCount").addEventListener("click", function(){
    criteria=ORDER_DES_PROD_SOLDCOUNT;
    sortAndShowProducts(criteria, products);
});


});
     


// id="rangeFilterCountMinProd">
         // id="rangeFilterCountMaxProd">
           

