var cart = {};
let costoSubTotal=0;
let total=0;
let costoEnvio=0;
let cantInputCantProd=0;
let arrUnitCostElem=[];
let costArtTotales=[];
let tipoMoneda=[];

function tipoEnvio(TipoEnvio){
  if (TipoEnvio==="S"){
    total=costoSubTotal+((costoSubTotal*5)/100);
    document.getElementById("total").innerHTML="UYU"+" "+total;
    document.getElementById("costoEnvio").innerHTML="UYU"+" "+((costoSubTotal*5)/100);
  }
  else if (TipoEnvio==="E"){
    total=costoSubTotal+((costoSubTotal*7)/100);
    document.getElementById("total").innerHTML="UYU"+" "+total;
    
    document.getElementById("costoEnvio").innerHTML="UYU"+" "+((costoSubTotal*7)/100);
  }
  else if (TipoEnvio==="P"){
    total=costoSubTotal+((costoSubTotal*15)/100);
    document.getElementById("total").innerHTML="UYU"+" "+total;
    document.getElementById("costoEnvio").innerHTML="UYU"+" "+((costoSubTotal*15)/100);
  }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            let elemCartAdd="";
            cart=resultObj.data;
            //articles
            for(let indice of cart.articles){
                let elementCart=indice;
                cantInputCantProd+=1;
                let TotalArt= elementCart.unitCost * elementCart.count;
                tipoMoneda.push(elementCart.currency);
                costArtTotales.push(TotalArt);

                if (elementCart.currency==="USD")
                  costoSubTotal+=TotalArt*40;
                else costoSubTotal+=TotalArt;
                //luego sumo o resto segun el click
                total=costoSubTotal+((costoSubTotal*5)/100);
                
                elemCartAdd+= `
                <tr>
                <td><img src="` + elementCart.src + `" alt=" " class="img-thumbnail" style="width:160px; height:160px"></td>
                <td><p >`+ elementCart.name +`</p></td>
                <td>`+elementCart.currency+" "+elementCart.unitCost+" "+ `</td>
                <td><input class="bg-success w-25" type="number" min="0" value="${elementCart.count}" size="10" id="${cantInputCantProd}">` +`</td>
                <td>`+elementCart.currency+" "+TotalArt+ `</td>               
                </tr>`
                arrUnitCostElem.push(elementCart.unitCost);
                }//FINAL FOR
                costoEnvio=(costoSubTotal*5)/100;
               elemCartAdd+= `
               <tr><td id="addFormPago"></td></tr>
            <tr><th>`+"Envío:"+`</th><td><p id="costoEnvio">`+"UYU"+" "+costoEnvio+`</p></td></tr> 
               <tr><th>`+"SubTotal:"+`</th><td id="costoSubTot">`+"UYU"+" "+costoSubTotal+`</td></tr> 
               <tr class="text-danger"><th><strong>`+"Total"+`</strong></th><td><p  id="total">`+"UYU"+" "+total+`</p></td></tr> 
               
    
              `
            document.getElementById("MetEnv").innerHTML=  `<th class="text-success"><strong >`+"Método de envío"+`</strong></th>

            <tr><th class="text-success">Dirección:</th><td><input type="text" placeholder="Calle" size="30" id="calle" required></td><td><input type="number" placeholder="Número" id="numero"  size="5" required></td><td><input type="text" placeholder="Esquina" id="esquina" size="30" required></td></tr>
            
            <tr><th class="text-success">País:</th><td><input type="text" placeholder="País" id="pais" size="30" required></td></tr>
            <tr><th class="text-success">`+"Tipo de Envío"+`</th><td><select name="select" id=tipoEnvio>>
             <option value="S" selected>`+"Standard"+`</option>
             <option value="E" >`+"Express"+`</option>
             <option value="P" >`+"Premium"+`</option>
           </select></p></td></tr>`


              // let campRespect = document.getElementById("campoRespectivo");
              // let addFormaDePago = document.getElementById("addFormPago");
              // let formaDePago = document.getElementById("formPago");
              // if (formaDePago.value==="transferenciaBancaria") {
              //   campRespect = "";
              //   campRespect+=`Forma de pago seleccionada:
              //   <input type="text" id="cuentaTransferencia" minlength="14" maxlength="16" required>`
              // }
              // else if (formaDePago.value==="tarjetaCredito") {
              //   campRespect = "";
              //   campRespect+=//acà deberìa mostrar los valores
              //   //en otro lado deberian ir los input
              //   `Forma de pago seleccionada: <input type="number" id="numeroTarjeta" minlength="16" maxlength="16" required></input>
              //   <input type="date" id="vencimientoTarjeta" value="2021-11-14"
              //   min="2021-11-14" max="2025-12-31">`
              // }



             document.getElementById("addElemCart").innerHTML+=elemCartAdd;
            
        }//FINAL IF JSON OK


//SI HAY UN CLICK EN EL SELECT FORMA PAGO
        document.getElementById("formPago").addEventListener("click",function(){
           let TipoEnvio=document.getElementById("formPago");
           let campRespect = document.getElementById("campoRespectivo");
           let addFormaDePago = document.getElementById("addFormPago");
           let formaDePago = document.getElementById("formPago");
           if (formaDePago.value==="transferenciaBancaria") {
             campRespect = "";
             campRespect+=`<input type="text" id="cuentaTransferencia" minlength="14" maxlength="16" required>`
           }
           else if (formaDePago.value==="tarjetaCredito") {
             campRespect = "";
             campRespect+=`<input type="number" id="numeroTarjeta" minlength="16" maxlength="16" required></input>
             <input type="date" id="vencimientoTarjeta" value="2021-11-14"
             min="2021-11-14" max="2025-12-31">`
           }
           
          });//FINAL FORMA DE PAGO
//INICIO SELECCIONAR TIPO ENVIO
        document.getElementById("tipoEnvio").addEventListener("click",function(){
          let TipoEnvio=document.getElementById("tipoEnvio");
          tipoEnvio(TipoEnvio.value);
          
        });//FINAL TIPO ENVIO
 //INICIO PAGAR
        document.getElementById("pagar").addEventListener("click",function(){
          if(document.getElementById("formPago").value&&document.getElementById("calle").value&&document.getElementById("numero").value&&document.getElementById("esquina").value
            &&document.getElementById("pais").value){
          getJSONData(CART_BUY_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                cartBuy=resultObj.data;
                let elemCartBuy="";
                elemCartBuy=cartBuy.msg;
  //vaciar tabla:
                let Table1 = document.getElementById("addElemCart");
                Table1.innerHTML = "";
                let Table2 = document.getElementById("MetEnv");
                Table2.innerHTML = "";
                document.getElementById("vacio").innerHTML=`<h4 style="text-align: center;">Su carrito está vacío</h4>`;
                document.getElementById("pagar").remove();
                document.getElementById("FP").remove();

                
                alert(elemCartBuy);
            }//FINAL IF
          })//FINAL GETJSON
          } //FINAL IF
          else if (!document.getElementById("formPago").value){
            alert("¡Complete la Forma de Pago!");}
          else alert("¡Complete todos los datos de envío!");       
          });
          //FINAL PAGAR

//CREO LOS EVENTOS CLICK PARA AUMENTAR/DISMINUIR CANTIDAD PRODUCTOS
          for (let i=1;i<=cantInputCantProd;i++) {

           document.getElementById(i).addEventListener("click",function(){
           let Table= document.getElementById("addElemCart");
           let classIT=Table.getElementsByClassName("bg-success");
           
           let classTd=Table.getElementsByTagName("td");
       
           let cant=classIT[i-1].value;
           let precio=arrUnitCostElem[i-1];

           classTd[i*5-1].innerHTML=`${tipoMoneda[i-1]}`+" "+`${cant*precio}`;
           
         if (tipoMoneda[i-1]==="USD"){
           costoSubTotal+=(cant*precio)*40-costArtTotales[i-1]*40;
            costArtTotales[i-1]=cant*precio; 
            document.getElementById("costoSubTot").innerHTML="UYU"+" "+(costoSubTotal);
            
          } else {
          costoSubTotal+=(cant*precio)-costArtTotales[i-1];
          costArtTotales[i-1]=cant*precio; 
            document.getElementById("costoSubTot").innerHTML="UYU"+" "+(costoSubTotal);
          }

          let nuevoCostoEnvio=document.getElementById("tipoEnvio");
          tipoEnvio(nuevoCostoEnvio.value);         
            
          });
            }//fin for

});//FINAL Json

});//FINAL DOM
