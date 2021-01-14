jquery(document).ready(function ($) {
    "use strict";
  
    $(".loader").delay(1000).fadeOut("slow");
    $("#overlayer").delay(1000).fadeOut("slow");
    $(".alert-success").hide();
    $(".alert-danger").hide();
    $("#prop-form").submit(function (event) {
      event.preventDefault();
      const property = getData();
      if (isValid(contact)) {
        $("#contact-submit").val("Sending...");
        $(".alert-success").hide();
        $(".alert-danger").hide();
        $.ajax({
          type: "POST",
          url: "http://localhost/api/property/add-property",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(property),
          success: function (response) {
            setTimeout(function () {
              $("#contact-submit").val("Send Message");
              $(".alert-success").show();
            }, 1000);
          },
          error: function (error) {
            $("#contact-submit").val("Send Message");
            $(".alert-danger").show();
          },
        });
      }
    });
    var getData = function () {
      var data = $("#prop-form")
        .serializeArray()
        .reduce(function (obj, item) {
          obj[item.name] = item.value;
          return obj;
        }, {});
      return data;
    };
    var isValid = function (property) {
      $(".error").remove();
      var error = true;
      if (isInteger(property.price)) {
        $("#price").after(
          '<span style="color: red;" class="error">Please provide a correct Price.</span>'
        );
        error = false;
      }
      if (property.price < 1) {
        $("#price").after(
          '<span style="color: red;" class="error">Please provide Price greater than 1.</span>'
        );
        error = false;
      }
      if (isInteger(property.bedroom) || (property.bedroom < 0)) {
        $("#bedroom").after(
          '<span style="color: red;" class="error">Please provide valid Bedroom number.</span>'
        );
        error = false;
      }
      if (isInteger(property.bathroom) || (property.bathroom < 0)) {
        $("#bathroom").after(
          '<span style="color: red;" class="error">Please provide valid Bedroom number.</span>'
        );
        error = false;
      }
      if (isInteger(property.size) || (property.size < 0)) {
        $("#size").after(
          '<span style="color: red;" class="error">Please provide valid Size.</span>'
        );
        error = false;
      }
      if (property.desc.length < 1) {
        $("#desc").after(
          '<span style="color: red;" class="error">Please provide valid Description.</span>'
        );
        error = false;
      }
      
      return error;
    };
});