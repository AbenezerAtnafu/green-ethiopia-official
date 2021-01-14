function validation(event) {
        $(".error").remove();
        let error = true;
        if($("#machName").val().length < 1){
          error = false;
          $('#machName').after('<span style="color: red;" class="error">Please provide Machine Name.</span>');
        }; 
        if($("#buildYear").val().length < 1){
          error = false;
          $('#buildYear').after('<span style="color: red;" class="error">Please provide Build Year.</span>');
        }; 
        if(!isNaN($("#buildYear"))){
          error = false;
          $('#buildYear').after('<span style="color: red;" class="error">Please provide correct Build Year.(Use numbers)</span>');
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
  
  