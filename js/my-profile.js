if (sessionStorage.getItem("usuario")){
    let nameUser=sessionStorage.getItem("usuario");
    document.getElementById("userName").innerHTML=nameUser;
}
//La siguiente función cambia en tiempo real la imagen
//osea, puedo ver como queda en el momento

$(document).ready(function() {
   
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".file-upload").on('change', function(){
        readURL(this);
    });
});
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
    let imagenPerfil = document.getElementById("imagePerfil").value;

    if (!localStorage.getItem("usuarioGuardado"))
    {

     let UserAdd = JSON.stringify({name:nombresPerfil,lastname:apellidosPerfil,
      age:edadPerfil,email:emailsPerfil,phone:telefonoPerfil,image:imagenPerfil})
      localStorage.setItem("usuarioGuardado",UserAdd);
    }//fin if
   else {//si existe y quiero modificar algo en particular
     let UserChange=JSON.parse(localStorage.getItem("usuarioGuardado"));

     if (nombresPerfil!==""){
      UserChange.name.innerHTML=nombresPerfil;
      document.getElementById("namesPerfil").innerHTML=nombresPerfil;
     }
     if (apellidosPerfil!==""){
      UserChange.lastname.innerHTML=apellidosPerfil;
        document.getElementById("lastNamesPerfil").innerHTML=apellidosPerfil;
     }
     if (edadPerfil!==""){
      UserChange.age.innerHTML=edadPerfil;
      document.getElementById("agePerfil").innerHTML=edadPerfil;
     }
     if (emailPerfil!==""){
      UserChange.email.innerHTML=emailsPerfil;
      document.getElementById("emailPerfil").innerHTML=emailsPerfil;
     } 
     if (telefonoPerfil!==""){
      UserChange.phone.innerHTML=telefonoPerfil;
      document.getElementById("phonePerfil").innerHTML=telefonoPerfil;
     }
     if (imagenPerfil!==""){
      UserChange.image.innerHTML=imagenPerfil;
      document.getElementById("imagePerfil").innerHTML=imagenPerfil;
     }
   }//fin else
    document.getElementById('myform').reset();

} //fin guardar datos

//if no existe ningún dato guardado no hago nada
    //cambiar datos              
                     
// Recuerda del uso de los métodos JSON.stringify y JSON.parse
//para poder almacenar y recuperar los datos almacenados respectivamente.


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    myform = document.getElementById('myform');
    myform.addEventListener("submit", addInfoP);

   if (localStorage.getItem("usuarioGuardado"))
    {

    let UserChange=JSON.parse(localStorage.getItem("usuarioGuardado"));

      document.getElementById("namesPerfil").innerHTML= UserChange.name;
    
   
     
        document.getElementById("lastNamesPerfil").innerHTML= UserChange.lastname;
    
 
      console.log(UserChange.name)
      document.getElementById("agePerfil").innerHTML=UserChange.age;
  
      
      document.getElementById("emailPerfil").innerHTML=UserChange.email;
 
      document.getElementById("phonePerfil").innerHTML=UserChange.phone;
 
      
      document.getElementById("imagePerfil").innerHTML=UserChange.image;
     }
});


   
