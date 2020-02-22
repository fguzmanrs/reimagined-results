$(document).ready(async () => {
  //* Get recent popular movies and render to carousel
  await getAndRenderCarousel();
  //* Click event handler for each movie
  $(".carousel-item .card-image").on("click", unfoldInfo);
  // $(".card-image").on("click", function ()
  //******************************** */
  $("select").formSelect();

  $("#select-genre").change(function() {
    const genre = $("#select-genre").val();
    // getRecommendation
    // convert to dropdownmenu
    $.ajax({
      url: `/api/movies/recommend/${genre}`,
      success: function(result) {
        // check result length, limit to 10
        let len = result.data.total_results;
        if (len > 10) len = 10;
        console.info(result);
        // empty movies
        $("#movies").empty();
        var carouselItemTemplate = "";
        // populate up to 10 movies on card
        for (let i = 0; i < len; i++) {
          carouselItemTemplate = `
<div class="carousel-item">
<div class="card-image">
<img src="https://image.tmdb.org/t/p/w154${result.data.results[i].poster_path}"></img>
</div>
</div>`;
          $("#movies").append(carouselItemTemplate);
          $(".carousel-item:last").data("info", result.data.results[i]);
          console.log(result.data.results[i]);
        }
        $(".card-image").on("click", unfoldInfo);
        $(".carousel").carousel({
          dist: 0,
          shift: 0,
          padding: 20
        });
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
    //3. Change genre id to genre name
    info.genreNames = await changeToGenreName(info.genre_ids);
    //4. Render movie detail info
    $("#movieDetail").empty();
    const infoHTML = `<div id = "info-card-1" class="card horizontal info-card">
<div id = "header">
<h2 class="header">${info.title}</h2>
<ul class="info-list">
<div class = "movie-genre"><li>Genre: ${info.genreNames}</li></div>
<!-- <li>Language: <div class = "movie-language"></div></li> --!>
<div class = "movie-date"><li>Release Date: ${info.release_date}</li></div>
<div class = "movie-rating"><li>Rating: ${info.vote_average}</li></div>
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
// Change genre ids to genre names
async function changeToGenreName(arr) {
  const genrenNameArr = arr.map(id => {
    const genreObj = genreList.find(genre => {
      return genre.id === id;
    });
    console.log("🥕 genreObj", genreObj, genreObj.name);
    return genreObj.name;
  });
  console.log("🍊 name arr", genrenNameArr);
  return `${genrenNameArr}`.split(",").join(", ");
}
const genreList = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 10402,
    name: "Music"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
  {
    id: 10770,
    name: "TV Movie"
  },
  {
    id: 53,
    name: "Thriller"
  },
  {
    id: 10752,
    name: "War"
  },
  {
    id: 37,
    name: "Western"
  }
];
