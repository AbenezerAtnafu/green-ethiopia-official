function validation(event){
  
    $(".error").remove();
    let error = true;

    if($("#fullName").val().length < 5){
        error = false;
        $('#fullName').after('<span style="color: red;" class="error">Please provide a name (more than 5 letters).</span>');
    }; 
    if($("#password").val().length < 8){
        error = false;
        $('#password').after('<span style="color: red;" class="error">Please provide a password (more than 8 characters).</span>');
    };
    if($("#password").val() != $("#repeatPassword").val()){
        error = false;
        $('#repeatPasswowrd').after('<span style="color: red;" class="error">Passwowrd doesnot match!</span>');
    };
    if ($("#email").val().length < 1) {
        $("#email").after(
          '<span style="color: red;" class="error">Please provide email.</span>'
        );
        error = false;
      } else {
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validEmail = regEx.test($("#email").val());
        if (!validEmail) {
          $("#email").after(
            '<span style="color: red;" class="error">Please provide valid email.</span>'
          );
          error = false;
        }
    }

    return error;
};