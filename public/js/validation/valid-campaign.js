function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

function validationCampaign(event) {
        
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
    if($("#place").val().length < 1){
        error = false;
        $('#place').after('<span style="color: red;" class="error">Please provide Place where the campaign occurs.</span>');
    }; 
    if(($("#video_url").val().length > 0) && !isValidURL($("#video_url").val())){
        error = false;
        $('#video_url').after('<span style="color: red;" class="error">Please provide valid Video url.</span>');
    }; 
    if(($("#join_us_url").val().length > 0) && !isValidURL($("#join_us_url").val())){
        error = false;
        $('#join_us_url').after('<span style="color: red;" class="error">Please provide valid url.</span>');
    };  
    if($('#file-3').length !== 0) {
        if($('#file-3').val().length < 1){
            error = false;
            $('#file-error').after('<span style="color: red;" class="error">Please provide atleast One Image.</span>');
        }
    }
    return error;
};





