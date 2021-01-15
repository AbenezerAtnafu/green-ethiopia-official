function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

function validation(event) {
    $(".error").remove();
    let error = true;
    console.log()
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
    
    if(($("#source_titles_one").val().length > 1) && ($("#source_urls_one").val().length < 1)){
      error = false;
      $('#source_urls_one').after('<span style="color: red;" class="error">Please provide the Link of the source.</span>');
    }
    if($("#source_urls_one").val().length > 1){
      if($("#source_titles_one").val().length < 1){
        error = false;
        $('#source_titles_one').after('<span style="color: red;" class="error">Please provide the title of the source.</span>');
      }
      if(!isValidURL($("#source_urls_one").val())){
        error = false;
        $("#source_urls_one").after('<span style="color: red;" class="error">Please provide a valid Link.</span>');
      };
    }

    if(($("#source_titles_two").val().length > 1) && ($("#source_urls_two").val().length < 1)){
      error = false;
      $('#source_urls_two').after('<span style="color: red;" class="error">Please provide the Link of the source.</span>');
    }
    if($("#source_urls_two").val().length > 1){
      if($("#source_titles_two").val().length < 1){
        error = false;
        $('#source_titles_two').after('<span style="color: red;" class="error">Please provide the title of the source.</span>');
      }
      if(!isValidURL($("#source_urls_two").val())){
        error = false;
        $("#source_urls_two").after('<span style="color: red;" class="error">Please provide a valid Link.</span>');
      };
    }

    if(($("#source_titles_three").val().length > 1) && ($("#source_urls_three").val().length < 1)){
      error = false;
      $('#source_urls_three').after('<span style="color: red;" class="error">Please provide the Link of the source.</span>');
    }
    if($("#source_urls_three").val().length > 1){
      if($("#source_titles_three").val().length < 1){
        error = false;
        $("#source_titles_three").after('<span style="color: red;" class="error">Please provide the title of the source.</span>');
      }
      if(!isValidURL($("#source_urls_three").val())){
        error = false;
        $("#source_urls_three").after('<span style="color: red;" class="error">Please provide a valid Link.</span>');
      };
    }

    if(($("#source_titles_four").val().length > 1) && ($("#source_urls_four").val().length < 1)){
      error = false;
      $('#source_urls_four').after('<span style="color: red;" class="error">Please provide the Link of the source.</span>');
    }
    if($("#source_urls_four").val().length > 1){
      if($("#source_titles_four").val().length < 1){
        error = false;
        $("#source_titles_four").after('<span style="color: red;" class="error">Please provide the title of the source.</span>');
      }
      if(!isValidURL($("#source_urls_four").val())){
        error = false;
        $("#source_urls_four").after('<span style="color: red;" class="error">Please provide a valid Link.</span>');
      };
    }

    if($('#file-3').length !== 0) {
      if($('#file-3').val().length < 1){
          error = false;
          $('#file-error').after('<span style="color: red;" class="error">Please provide atleast One Image.</span>');
      }
    }
    return error;
};

