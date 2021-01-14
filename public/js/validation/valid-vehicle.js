function validation(event) {
  
  $(".error").remove();
  let error = true;
  if($("#make").val().length < 1){
    error = false;
    $('#make').after('<span style="color: red;" class="error">Please provide make.</span>');
  }; 
  if($("#model").val().length < 1){
    error = false;
    $('#model').after('<span style="color: red;" class="error">Please provide model.</span>');
  }; 
  if($("#buildYear").val().length < 1){
    error = false;
    $('#buildYear').after('<span style="color: red;" class="error">Please provide Build Year.</span>');
  }; 
  if(!isNaN($("#buildYear"))){
    error = false;
    $('#buildYear').after('<span style="color: red;" class="error">Please provide correct Build Year.(Use numbers)</span>');
  };
  if($("#carType").val().length < 1){
    error = false;
    $('#carType').after('<span style="color: red;" class="error">Please provide Car Type.</span>');
  }; 
  if($("#engine").val().length < 1){
    error = false;
    $('#engine').after('<span style="color: red;" class="error">Please provide Engine.</span>');
  }; 
  if($("#energy").val().length < 1){
    error = false;
    $('#energy').after('<span style="color: red;" class="error">Please provide Energy.</span>');
  }; 
  if(!isNaN($("#energy"))){
    error = false;
    $('#energy').after('<span style="color: red;" class="error">Please provide correct Energy.(Use numbers)</span>');
  };
  if($("#color").val().length < 1){
    error = false;
    $('#color').after('<span style="color: red;" class="error">Please provide Color.</span>');
  }; 
  if($("#mileage").val().length < 1){
    error = false;
    $('#mileage').after('<span style="color: red;" class="error">Please provide Mileage.</span>');
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

