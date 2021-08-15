
const array = [];
const login = () => {
  const name = document.getElementById("txtcorreo").value;
  const pass = document.getElementById("txtclave").value;
  if (name && pass) {
    tbody.innerHTML += `<tr><td>${name}</td><td>${pass}</td></tr>`;
    //limpiar el texto para que luego se puedan escribir mas
    // y que no quede registro de lo anterior.
    document.getElementById("txtcorreo").value = "";
    document.getElementById("txtclave").value = "";
    array.push({name: correo,name: clave});
    window.location="index.html";
  } else {
    alert("Correo y Clave no deben ser vacíos");
  }
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btnSave").addEventListener("click", buttonSave);
    
});