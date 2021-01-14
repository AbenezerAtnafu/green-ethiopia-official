function validation(event) {
    $(".error").remove();
    let error = true;
    if($("#propertyName").val().length < 1){
      error = false;
      $('#propertyName').after('<span style="color: red;" class="error">Please provide Property Name.</span>');
    };
    if($("#bedroom").val().length < 1){
      error = false;
      $('#bedroom').after('<span style="color: red;" class="error">Please provide Bedroom.</span>');
    }; 
    if(!isNaN($("#bedroom"))){
      error = false;
      $('#bedroom').after('<span style="color: red;" class="error">Please provide correct Bedroom.(Use numbers)</span>');
    };
    if($("#bathroom").val().length < 1){
        error = false;
        $('#bathroom').after('<span style="color: red;" class="error">Please provide Bathroom.</span>');
      }; 
    if(!isNaN($("#bathroom"))){
    error = false;
    $('#bathroom').after('<span style="color: red;" class="error">Please provide correct Bathroom.(Use numbers)</span>');
    };
    if($("#size").val().length < 1){
        error = false;
        $('#size').after('<span style="color: red;" class="error">Please provide Size.</span>');
      }; 
    if(!isNaN($("#size"))){
    error = false;
    $('#size').after('<span style="color: red;" class="error">Please provide correct Size.(Use numbers)</span>');
    };
    if($("#location").val().length < 1){
      error = false;
      $('#location').after('<span style="color: red;" class="error">Please provide Location.</span>');
    }; 
    if($("#price").val().length < 1){
      error = false;
      $('#price').after('<span style="color: red;" class="error">Please provide Price.</span>');
    }; 
    if(!isNaN($("#price"))){
      error = false;
      $('#price').after('<span style="color: red;" class="error">Please provide correct Price.(Use numbers)</span>');
    };
    if($.trim($("#validationTextarea").val()).length < 1){
      error = false;
      $('#validationTextarea').after('<span style="color: red;" class="error">Please provide Description.</span>');
    };
    if($('#file-3').val().length < 1){
        error = false;
        $('#file-error').after('<span style="color: red;" class="error">Please provide atleast One Image.</span>');
    }
    return error;
};
  
  