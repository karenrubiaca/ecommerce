var cart = {};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            let elemCartAdd=` <tr>
            <th>`+ "Producto" +`</th>
            <th>`+"Descripción"+`</th>
            <th>`+"Precio"+`</th>
            <th>`+"Cantidad de Productos"+`</th>
            <th>`+"Subtotal"+`</th>
            <th>`+"Envío"+`</th>
            <th>`+"Total"+`</th>
          </tr>`;
          
            cart=resultObj.data;
            //articles
           // console.log(cart);
            
           // console.log(cart.articles);
            for(let indice of cart.articles){
                let elementCart=indice;
                elemCartAdd+= `
               
                <tr>
                <td><img src="` + elementCart.src + `" alt="` + elementCart.description + `" class="img-thumbnail" style="width:160px; height:160px"></td>
                <td><h4 class="mb-1">`+ elementCart.name +`</h4></td>
               
                <td><p class="price">`+elementCart.currency+" "+elementCart.unitCost+" "+ `</p></td>
                <td><p class="price">` + elementCart.count +`</p></td>
                <td><p class="price">`+elementCart.currency+" "+elementCart.unitCost*elementCart.count+" "+ `</p></td>
               </tr>
               <hr>                ` 
                
            }
            document.getElementById("addElemCart").innerHTML=elemCartAdd;
            
        }
    
        });
});
