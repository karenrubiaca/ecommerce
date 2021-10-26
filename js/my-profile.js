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

function guardarDatos(namesP,last_namesP,ageP,emailP,phoneP,imagePerfil){
    let userAdd = 
    localStorage.setItem("usuarioGuardado",userAdd)
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});