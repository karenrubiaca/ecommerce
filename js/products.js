const array = [];
const showList = (productos) => {
    const list = document.createElement("ul"); // Contenedor de toda la lista
    // Se recorre el array de propietarios
    for (let prod of productos) {
      const li = document.createElement("li"); // Item de lista por cada productos
      li.appendChild(document.createTextNode(`${prod.name} ${prod.description} ${prod.cost} `));
      list.appendChild(li); // Se añade el item de propietario a la lista general
      array.push(prod.name, prod.description, prod.cost);
    }
    document.body.appendChild(list); // Se muestra en pantalla la lista total
  };



  
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
      //primero limpio el storage
 // localStorage.clear();
  //agrego los datos del arreglo como string
  localStorage.setItem('productos', JSON.stringify(array));
   // const products = (await getJSONData(localStorage.getItem("datos")));
    showList(JSON.parse(localStorage.getItem("productos")));
   // showList(products);
});