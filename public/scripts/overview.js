$(document).ready(async () => {
  getAndRenderCarousel();

  //
  $("select").formSelect();

  // $("#select-genre").change(function() {
  //   // submitted
  //   // alert("genreId: " + $('#select-genre').val());

  //   var searching = $("#select-genre").val();
  //   // getRecommendation
  //   // convert to dropdownmenu
  //   $.ajax({
  //     url: `/api/movies/recommend/${searching}`,
  //     success: function(result) {
  //       // check result length, limit to 10
  //       let len = result.length;
  //       if (len > 10) len = 10;

  //       // empty movies
  //       $("#movies").empty();

  //       // populate up to 10 movies on card
  //       for (let i = 0; i < len; i++) {
  //         carrouselItemTemplate = `
  //         <div class="carousel-item" >
  //           <div class="card-image">
  //             <img src=${result[i].posterPath}> </img>
  //           </div>
  //           <div class="card-content">
  //             <span class="card-title">${result[i].title}</span>
  //             <p>${result[i].overview}</p>
  //           </div>
  //           <div class="card-action">

  //           </div>
  //         </div>`;

  //         $("#movies").append(carrouselItemTemplate);
  //       }
  //     }
  //   });
  // });

  async function getAndRenderCarousel() {
    try {
      // GET RECENT MOVIES
      const result = await axios("/api/movies/recent");
      const recentMovies = result.data.data;
      console.log("recent movies: ", recentMovies);

      // RENDER carousel with movies
      refreshCarousel(recentMovies);
    } catch (err) {
      console.log("error occured!");
      alert(err);
    }
  }

  // Carousel Generator
  function refreshCarousel(arr) {
    console.log("🍒 refresh carousel");

    // populate 20 movies on card
    for (movie of arr) {
      const carouselItem = `
       <div class="carousel-item">
         <div class="card-image">
           <img src="https://image.tmdb.org/t/p/w154${movie.poster_path}"></img>
         </div>
         <div class="card-content">
           <span class="card-title">${movie.title}</span>
           <p>${movie.overview}</p>
         </div>
         <div class="card-action"></div>
       </div>`;

      $("#movies").append(carouselItem);

      // Insert data to each carousel item to use later
      $(".carousel:last").data("info", movie);
      // console.log(" Inserted data", $(".carousel:last").data("info"));

      // Initiate carousel
      $(".carousel").carousel({
        dist: 0,
        shift: 0,
        padding: 20
      });
    }
  }
});
