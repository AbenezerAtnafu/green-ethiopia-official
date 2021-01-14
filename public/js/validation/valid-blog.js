function validation(event) {
    $(".error").remove();
    let error = true;
    if($("#title").val().length < 1){
      error = false;
      $('#title').after('<span style="color: red;" class="error">Please provide Title.</span>');
    };
    if($("#description").val().length < 1){
      error = false;
      $('#description').after('<span style="color: red;" class="error">Please provide Description.</span>');
    }; 
    
    if($("#writer").val().length < 1){
      error = false;
      $('#writer').after('<span style="color: red;" class="error">Please provide Author.</span>');
    }; 
    
    if($('#file-3').val().length < 1){
        error = false;
        $('#file-error').after('<span style="color: red;" class="error">Please provide atleast One Image.</span>');
    }
    return error;
};

