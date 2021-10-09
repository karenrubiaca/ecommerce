var cart = {};
let ident=0;
let costoSubTotal=0;
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
                
                let TotalArt= elementCart.unitCost * elementCart.count;
                if (elementCart.currency==="USD")
                  costoSubTotal+=TotalArt*40;
                else costoSubTotal+=TotalArt;
                //luego sumo o resto segun el click

                elemCartAdd+= `
               
                <tr>
                <td><img src="` + elementCart.src + `" alt=" " class="img-thumbnail" style="width:160px; height:160px"></td>
                <td><p >`+ elementCart.name +`</p></td>
               
                <td>`+elementCart.currency+" "+elementCart.unitCost+" "+ `</td>
                <td><input type="number" min="1" value="${elementCart.count}" size="10">` +`</td>
                <td>`+elementCart.currency+" "+TotalArt+ `</td>                
                
               
                </tr>`}
               elemCartAdd+= `
               <tr><th>`+"Forma de Pago"+`</th><td><select name="select">
               <option value="value1" selected>`+"Transferencia Bancaria"+`</option>
               <option value="value2" >`+"Tarjeta de Crédito"+`</option>
             </select></td></tr>
             

            <tr><th>`+"Envío:"+`</th><td>`+"Acá va el costo de envío segun la forma de pago"+`</td></tr> 
               

               <tr><th>`+"SubTotal:"+`</th><td>`+costoSubTotal+`</td></tr> 
               <tr><th><strong>`+"Total"+`</strong></th><td>`+"Acá va el Total"+`</td></tr> 
               
               <th><strong>`+"Método de envío"+`</strong></th>

               <tr><th>Dirección:</th><td><input type="text" placeholder="Calle" size="30" requerid></td><td><input type="number" placeholder="Número" size="5" requerid></td><td><input type="text" placeholder="Esquina" size="30" requerid></td></tr>
               
               <tr><th>País:</th><td><input type="text" placeholder="País" size="30" requerid></td></tr>
               <tr><th>`+"Tipo de Envío"+`</th><td><select name="select" id=tipoEnvio>
                <option value="S" selected>`+"Standard"+`</option>
                <option value="E" >`+"Express"+`</option>
                <option value="P" >`+"Premium"+`</option>
              </select></p></td></tr>`
              
            
             document.getElementById("addElemCart").innerHTML+=elemCartAdd;
            
        }



//SI HAY UN CLICK EN EL SELECT TIPOENVIO

        let TipoEnvio=document.getElementById("tipoEnvio").value;
        if (TipoEnvio===S){

        }
        else if (TipoEnvio===E){

        }
        else if (TipoEnvio===P){

        }
        
        
    
        });
});

 //Premium (2-5 días) - Costo del 15% sobre el subtotal.
//Express (5-8 días) - Costo del 7% sobre el subtotal.
//Standard (12 a 15 días) - Costo del 5% sobre el subtotal.