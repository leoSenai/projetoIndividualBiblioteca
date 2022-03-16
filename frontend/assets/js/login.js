$('#usuario').on('focusout', function(event){
    let user = $('#usuario').val();
    if(user == ""){
        toastr.error('Usuário não preenchido');
    }
});


$('#logar').on('click', function(event){
    event.preventDefault();
    let user = $('#usuario').val();
    let password = $('#password').val();
    window.location.href = "./pages/home.html";
});
