"use strict";
if (sessionStorage.getItem("usuario")){
    let nameUser=sessionStorage.getItem("usuario");
    document.getElementById("userName").innerHTML=nameUser;
}
//La siguiente función cambia en tiempo real la imagen
//osea, puedo ver como queda en el momento


function addInfoP(event){
//function guardarDatos(nombresPerfil,apellidosPerfil,edadPerfil,emailsPerfil,
   // telefonoPerfil,imagenPerfil){
// CREARLO SI NO existe

    event.preventDefault();

    let nombresPerfil = document.getElementById("namesP").value;
    let apellidosPerfil = document.getElementById("last_namesP").value;
    let edadPerfil = document.getElementById("ageP").value;
    let emailsPerfil = document.getElementById("emailP").value;
    let telefonoPerfil = document.getElementById("phoneP").value;
    if (!localStorage.getItem("usuarioGuardado"))
    {
     let UserAdd = JSON.stringify({name:nombresPerfil,lastname:apellidosPerfil,
      age:edadPerfil,email:emailsPerfil,phone:telefonoPerfil})
      localStorage.setItem("usuarioGuardado",UserAdd);
    }//fin if
     let UserChange=JSON.parse(localStorage.getItem("usuarioGuardado"));
     if (nombresPerfil!==""){
      UserChange.name=nombresPerfil;
      document.getElementById("namesPerfil").innerHTML=nombresPerfil;
     }
     if (apellidosPerfil!==""){
      UserChange.lastname=apellidosPerfil;
        document.getElementById("lastNamesPerfil").innerHTML=apellidosPerfil;
     }
     if (edadPerfil!==""){
      UserChange.age=edadPerfil;
      document.getElementById("agePerfil").innerHTML=edadPerfil;
     }
     if (emailsPerfil!==""){
      UserChange.email=emailsPerfil;
      document.getElementById("emailPerfil").innerHTML=emailsPerfil;
     } 
     if (telefonoPerfil!==""){
      UserChange.phone=telefonoPerfil;
      document.getElementById("phonePerfil").innerHTML=telefonoPerfil;
     }  
     localStorage.setItem("usuarioGuardado",JSON.stringify(UserChange));
    document.getElementById('myform').reset();

} //fin guardar datos

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

   let myform = document.getElementById('myform');
    myform.addEventListener("submit", addInfoP);

   if (localStorage.getItem("usuarioGuardado"))
    {
      let UserChange=JSON.parse(localStorage.getItem("usuarioGuardado"));
      if (UserChange.name) document.getElementById("namesPerfil").innerHTML= UserChange.name;     
      if (UserChange.lastname) document.getElementById("lastNamesPerfil").innerHTML= UserChange.lastname;
      if (UserChange.age) document.getElementById("agePerfil").innerHTML=UserChange.age;
      if (UserChange.email) document.getElementById("emailPerfil").innerHTML=UserChange.email;
      if (UserChange.phone) document.getElementById("phonePerfil").innerHTML=UserChange.phone;
    }
});


   
