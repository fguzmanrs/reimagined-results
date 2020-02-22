$(document).ready(async () => {
  //* Get recent popular movies and render to carousel
  await getAndRenderCarousel();

  //* Click event handler for each movie
  $(".carousel-item .card-image").click(unfoldInfo);

  //******************************** */
  $("select").formSelect();

  $("#select-genre").change(function() {
    // submitted
    // alert("genreId: " + $('#select-genre').val());

    var searching = $("#select-genre").val();
    // getRecommendation
    // convert to dropdownmenu
    $.ajax({
      url: `/api/movies/recommend/${searching}`,
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

  //******************************** */
  //! Event handler : unfold movie detail info
  async function unfoldInfo(e) {
    //1. Get movie info
    const info = $(e.target)
      .closest(".carousel-item")
      .data("info");

    console.log("🍓Info title: ", info);

    //2. Get providers
    const providers = await getProviders(info.id);
    console.log("🥬 providers arr", providers);

    //3. Render movie detail info
    $("#movieDetail").empty();

    const infoHTML = `<div id = "info-card-1" class="card horizontal info-card">
                        <div id = "header">
                            <h2 class="header">${info.title}</h2>
                            <ul class="info-list">
                                <li>Genre: <div class = "movie-genre">${info.genre_ids}</div></li>
                                <!-- <li>Language: <div class = "movie-language"></div></li> --!>
                                <li>Release Date: <div class = "movie-date">${info.release_date}</div></li>
                                <li>Rating: <div class = "movie-rating">${info.vote_average}</div></li>
                            </ul>
                            <div id = "info-link" class="card-action"></div>
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <div class = "movie-overview"><p>${info.overview}</p></div>
                            </div>
                            <!-- <div class="card-action">
                                <a href="#">This is a link</a>
                            </div> -->
                        </div>
                       </div>`;

    $("#movieDetail").append(infoHTML);

    // Render on demand providers link
    if (providers.length > 0) {
      for (provider of providers) {
        // Generate HTML
        const providersHTML = `<a class = "stream-links" id = ${provider.display_name} href=${provider.url} target="_blank">${provider.display_name}</a>`;

        $(".card-action").append(providersHTML);
      }
    } else {
      $(".card-action").append(
        "<p class='no-streaming'>No streaming available</p>"
      );
    }
  }

  //! Bring data from DB and render carousel
  async function getAndRenderCarousel() {
    try {
      // GET RECENT MOVIES
      const result = await axios("/api/movies/recent");
      const recentMovies = result.data.data;
      console.log("recent movies: ", recentMovies);

      // RENDER carousel with movies
      generateCarouselHTML(recentMovies);
    } catch (err) {
      console.log("error occured!");
      alert(err);
    }
  }

  //! Carousel HTML Generator
  function generateCarouselHTML(arr) {
    console.log("🍒 refresh carousel");

    // populate 20 movies on card
    for (movie of arr) {
      const carouselItem = `
       <div class="carousel-item">
         <div class="card-image">
           <img src="https://image.tmdb.org/t/p/w154${movie.poster_path}"></img>
         </div>
       </div>`;

      $("#movies").append(carouselItem);

      // Insert data to each carousel item to use later
      $(".carousel-item:last").data("info", movie);
      // console.log(" Inserted data", $(".carousel:last").data("info"));

      // Initiate carousel
      $(".carousel").carousel({
        dist: 0,
        shift: 0,
        padding: 20
      });
    }
  }

  //! Get providers data
  async function getProviders(tmdbId) {
    console.log("🥝 inside title", tmdbId);

    const result = await axios(`/api/movies/providers/${tmdbId}`);
    const providersArr = result.data.data;

    console.log("🍈 provider results: ", providersArr);

    return providersArr;
  }
});
