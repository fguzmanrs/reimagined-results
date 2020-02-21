$(document).ready(function() {
  $("select").formSelect();

  $(".carousel").carousel({
    dist: 0,
    shift: 0,
    padding: 20
  });

  $("#select-genre").change(function() {
    // submitted
    // alert("genreId: " + $('#select-genre').val());

    var searching = $("#select-genre").val();
    // getRecommendation
    // convert to dropdownmenu
    $.ajax({
      url: `/api/recommend/${searching}`,
      success: function(result) {
        // check result length, limit to 10
        let len = result.length;
        if (len > 10) len = 10;

        // empty movies
        $("#movies").empty();

        // populate up to 10 movies on card
        for (let i = 0; i < len; i++) {
          carrouselItemTemplate = `
          <div class="carousel-item" >
            <div class="card-image">
              <img src=${result[i].posterPath}> </img>
            </div>
            <div class="card-content">
              <span class="card-title">${result[i].title}</span>
              <p>${result[i].overview}</p>
            </div>
            <div class="card-action">
            
            </div>
          </div>`;

          $("#movies").append(carrouselItemTemplate);
        }
      }
    });
  });
});
