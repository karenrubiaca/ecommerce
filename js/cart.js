var cart = {};
let ident=0;
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            let elemCartAdd="";
          
            cart=resultObj.data;
            //articles
           // console.log(cart);
            
           // console.log(cart.articles);
            for(let indice of cart.articles){
                let elementCart=indice;
                elemCartAdd+= `
               
                <tr>
                <td><img src="` + elementCart.src + `" alt=" " class="img-thumbnail" style="width:160px; height:160px"></td>
                <td><p >`+ elementCart.name +`</p></td>
               
                <td><p class="price">`+elementCart.currency+" "+elementCart.unitCost+" "+ `</p></td>
                <td><p class="price"><input type="number" min="1" value="${elementCart.count}" size="10">` +`</p></td>
                <td><p class="price">`+elementCart.currency+" "+elementCart.unitCost*elementCart.count+" "+ `</p></td>
                <td>`+"Envío"+`</td>
                <td>`+"Total"+`</td>
                <td><p><select name="select">
                <option value="value1" selected>`+"Transferencia Bancaria"+`</option>
                <option value="value2" >`+"Tarjeta de Crédito"+`</option>
              </select></p></td>
                             
                </tr> <br> `}
               elemCartAdd+= `<th><strong>`+"Método de envío"+`</strong></th>

               <tr><th>Dirección:</th><td><input type="text" placeholder="Calle Número Esquina" size="30"></td></tr>
               
               <tr><th>País:</th><td><input type="text" placeholder="País" size="30"></td></tr>
               <tr><th>`+"Tipo de Envío"+`</th><td><select name="select">
                <option value="value1" selected>`+"Standard"+`</option>
                <option value="value2" >`+"Express"+`</option>
                <option value="value2" >`+"Premium"+`</option>
              </select></p></td></tr>`
              
            
            elemCartAdd+= `<button type="button" class="btn btn-success ">`+"Pagar"+`</button>`
            document.getElementById("addElemCart").innerHTML+=elemCartAdd;
            
        }
    
        });
});