$('#usuario').on('focusout', function(event){
    let user = $('#usuario').val();
    if(user == ""){
        toastr.error('Usuário não preenchido');
    }
});


$('#logar').on('click', function(event){
    event.preventDefault();
    let user = $('#usuario').val();
    let password = $('#senha').val();

    console.log(user, password);

    $.post('http://127.0.0.1:3000/login',{
        username: +user,
        password: password
    }, function(res,details){
        if(details == "success"){
            localStorage.setItem("access_token",res.access_token);
            window.location.href = "./pages/home.html";
        }else{
            toastr.error("Login ou Senha Invalida");
        }
    })
});
