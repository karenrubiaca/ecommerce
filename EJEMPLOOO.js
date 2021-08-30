var products = [];

function sortAndShowProducts(criteria, array){

    if (criteria === ORDER_ASC_BY_COST) //ascendente por precio
    {
        array.sort((a,b) {
            if ( a[cost] < b[cost] ){ return -1; }
            if ( a[cost] > b[cost] ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DES_BY_COST){//descendente por precio
        array.sort(function(a, b) {
            if ( a[cost] > b[cost] ){ return -1; }
            if ( a[cost] < b[cost] ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DES_PROD_COUNT){//descendiente por cantidad
        array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    showProductsList();
}

function showProductsList(products){   
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
  
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
           showProductsList(products);
       }
       hideSpinner();
   });

   document.getElementById("sortProdAsc").addEventListener("click", function(){
       
    sortAndShowProducts(ORDER_ASC_BY_NAME);
});

});