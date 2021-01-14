function validation(event) {
        $(".error").remove();
        let error = true;
        if($("#buildingName").val().length < 1){
          error = false;
          $('#buildingName').after('<span style="color: red;" class="error">Please provide Building Name.</span>');
        };
        if($("#buildingType").val().length < 1){
          error = false;
          $('#buildingType').after('<span style="color: red;" class="error">Please provide Building Type.</span>');
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
  
  