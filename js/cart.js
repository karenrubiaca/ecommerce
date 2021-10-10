var cart = {};
let ident=0;
let costoSubTotal=0;
let total=0;
let costoEnvio=0;
let cantInputCantProd=0;
let arrUnitCostElem=[];
let costArtTotales=[];
let tipoMoneda=[];
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
                <td><input class="bg-success"" type="number" min="1" value="${elementCart.count}" size="10" id="${cantInputCantProd}">` +`</td>
                <td>`+TotalArt+ `</td>                
                
               
                </tr>`
                arrUnitCostElem.push(elementCart.unitCost);
                }//FINAL FOR
                costoEnvio=(costoSubTotal*5)/100;
               elemCartAdd+= `
               <tr><th>`+"Forma de Pago"+`</th><td><select name="select">
               <option value="value1" selected>`+"Transferencia Bancaria"+`</option>
               <option value="value2" >`+"Tarjeta de Crédito"+`</option>
             </select></td></tr>
             

            <tr><th>`+"Envío:"+`</th><td><p id="costoEnvio">`+"UYU"+costoEnvio+`</p></td></tr> 
               

               <tr><th>`+"SubTotal:"+`</th><td id="costoSubTot">`+"UYU"+costoSubTotal+`</td></tr> 
               <tr class="text-danger"><th><strong>`+"Total"+`</strong></th><td><p  id="total">`+"UYU"+total+`</p></td></tr> 
               
    
              `
            document.getElementById("MetEnv").innerHTML=  `<th><strong>`+"Método de envío"+`</strong></th>

            <tr><th>Dirección:</th><td><input type="text" placeholder="Calle" size="30" id="calle" required></td><td><input type="number" placeholder="Número" id="numero"  size="5" required></td><td><input type="text" placeholder="Esquina" id="esquina" size="30" required></td></tr>
            
            <tr><th>País:</th><td><input type="text" placeholder="País" id="pais" size="30" required></td></tr>
            <tr><th>`+"Tipo de Envío"+`</th><td><select name="select" id=tipoEnvio>
             <option value="S" selected>`+"Standard"+`</option>
             <option value="E" >`+"Express"+`</option>
             <option value="P" >`+"Premium"+`</option>
           </select></p></td></tr>`
             document.getElementById("addElemCart").innerHTML+=elemCartAdd;
            
        }//FINAL IF JSON OK


//SI HAY UN CLICK EN EL SELECT TIPOENVIO
        document.getElementById("tipoEnvio").addEventListener("click",function(){
          let TipoEnvio=document.getElementById("tipoEnvio").value;
          if (TipoEnvio==="S"){
            total=costoSubTotal+((costoSubTotal*5)/100);
            document.getElementById("total").innerHTML=total;
            document.getElementById("costoEnvio").innerHTML=(costoSubTotal*5)/100;
          }
          else if (TipoEnvio==="E"){
            total=costoSubTotal+((costoSubTotal*7)/100);
            document.getElementById("total").innerHTML=total;
            
            document.getElementById("costoEnvio").innerHTML=(costoSubTotal*7)/100;
          }
          else if (TipoEnvio==="P"){
            total=costoSubTotal+((costoSubTotal*15)/100);
            document.getElementById("total").innerHTML=total;
            document.getElementById("costoEnvio").innerHTML=(costoSubTotal*15)/100;
          }
          
        });//FINAL TIPO ENVIO
    
        document.getElementById("pagar").addEventListener("click",function(){
          if(document.getElementById("calle").value&&document.getElementById("numero").value&&document.getElementById("esquina").value
            &&document.getElementById("pais").value){
          getJSONData(CART_BUY_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                cartBuy=resultObj.data;
                let elemCartBuy="";
                elemCartBuy=cartBuy.msg;
  //vaciar tabla:
                let Table = document.getElementById("addElemCart");
                Table.innerHTML = "";
                document.getElementById("vacio").innerHTML=`<h4 style="text-align: center;">Su carrito está vacío</h4>`;
                document.getElementById("pagar").remove();
                alert(elemCartBuy);
            }//FINAL IF
          })//FINAL GETJSON
          } //FINAL IF
          else alert("¡Complete todos los datos de envío!")         
          });//FINAL PAGAR




          for (let i=1;i<=cantInputCantProd;i++) {

           document.getElementById(i).addEventListener("click",function(){
           let Table= document.getElementById("addElemCart");
           let classDT=Table.getElementsByClassName("bg-success");
           
           let classTd=Table.getElementsByTagName("td");
        //   if (document.getElementById(i).value>arrCantElemTipo.push[i]){
            // let dif=document.getElementById(i).value-arrCantElemTipo.push[i];
           // classDT[9].innerHTML+=dif*classDT[8];
           // arrCantElemTipo.push[1].innerHTML+=dif;
           // classDT[1].innerHTML = 33;
                  
           //classDT[9].innerHTML=(document.getElementById("1").value-arrCantElemTipo.push[1])*1
           let cant=classDT[i-1].value;
           let precio=arrUnitCostElem[i-1];



           classTd[i*5-1].innerHTML=cant*precio;
           console.log(classDT[i-1].value);//classDT[7]*classDT[8]
           console.log(classTd[i*5]);
       ///    console.log(classTd[2]..charAt(0));
          // costArtTotales[i-1];
         if (tipoMoneda[i-1]==="USD"){
            document.getElementById("costoSubTot").innerHTML=costoSubTotal+(cant*precio-costArtTotales[i-1])*40;
          } else document.getElementById("costoSubTot").innerHTML=costoSubTotal+(cant*precio-costArtTotales[i-1]);
         
          
         // }

           
           
                 
            
          });
            }//fin for




});//FINAL Json

          

  




});//FINAL DOM
