function respaldoUsuario(correo, clave){  

  if (correo.trim()==="" || clave.trim()===""){ //el dato recibido no debe ser vacío. 
//ni ser espacios en blanco.
}    
else{
sessionStorage.setItem("usuario", correo.trim());//setItem almacena el dato en la posición "usuario"
document.getElementById("txtcorreo").value = "";
  document.getElementById("txtclave").value = "";
window.location="index.html";
//getItem obtiene el dato almacenado en la posición "usuario"

}
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){    
    
});