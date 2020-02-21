
$(document).ready(function(){

  $('select').formSelect();


  $('.carousel').carousel({
        dist:0,
        shift:0,
        padding:20,
  });

  $('form').submit(function(){
    var searching = $('#srch-input').val();
    // getRecommendation
// convert to dropdownmenu
    $.ajax({url: "/api/", success: function(result){
      $("#div1").html(result);
    }});

    // Get params from submit
    // alert("Submitted");
    // Call ajax using params
    // Update DOM with results

  });

  // $('form').submit(function(){
    // Submitted

  // });
  
});