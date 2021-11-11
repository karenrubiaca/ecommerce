"use strict";
if (localStorage.getItem("usuario")){
    let nameUser=localStorage.getItem("usuario");
    document.getElementById("userName").innerHTML=nameUser;
}
//La siguiente función cambia en tiempo real la imagen
//osea, puedo ver como queda en el momento


function addInfoProfile(event){

    event.preventDefault();

    let nombresPerfil = document.getElementById("namesP").value;
    let apellidosPerfil = document.getElementById("last_namesP").value;
    let edadPerfil = document.getElementById("ageP").value;
    let emailsPerfil = document.getElementById("emailP").value;
    let telefonoPerfil = document.getElementById("phoneP").value;
    if (!localStorage.getItem("usuarioGuardado"))
    {
     let userAdd = JSON.stringify({name:nombresPerfil,lastname:apellidosPerfil,
      age:edadPerfil,email:emailsPerfil,phone:telefonoPerfil})
      localStorage.setItem("usuarioGuardado",userAdd);
    }//fin if
     let userChange=JSON.parse(localStorage.getItem("usuarioGuardado"));
     if (nombresPerfil!==""){
      userChange.name=nombresPerfil;
      document.getElementById("namesPerfil").innerHTML=nombresPerfil;
     }
     if (apellidosPerfil!==""){
      userChange.lastname=apellidosPerfil;
        document.getElementById("lastNamesPerfil").innerHTML=apellidosPerfil;
     }
     if (edadPerfil!==""){
      userChange.age=edadPerfil;
      document.getElementById("agePerfil").innerHTML=edadPerfil;
     }
     if (emailsPerfil!==""){
      userChange.email=emailsPerfil;
      document.getElementById("emailPerfil").innerHTML=emailsPerfil;
     } 
     if (telefonoPerfil!==""){
      userChange.phone=telefonoPerfil;
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
    myform.addEventListener("submit", addInfoProfile);

   if (localStorage.getItem("usuarioGuardado"))
    {
      let userChange=JSON.parse(localStorage.getItem("usuarioGuardado"));
      if (userChange.name) document.getElementById("namesPerfil").innerHTML= userChange.name;     
      if (userChange.lastname) document.getElementById("lastNamesPerfil").innerHTML= userChange.lastname;
      if (userChange.age) document.getElementById("agePerfil").innerHTML=userChange.age;
      if (userChange.email) document.getElementById("emailPerfil").innerHTML=userChange.email;
      if (userChange.phone) document.getElementById("phonePerfil").innerHTML=userChange.phone;
    }
});


   
