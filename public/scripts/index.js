

$(document).ready(function(){
  $('.carousel').carousel({
        dist:0,
        shift:0,
        padding:20,

  });
});

// $("button").click(function() {

// })

var state = {
    searchGenres: [],
    numOfRequest: 10, //how many movies to get from server? (1-100)
    maxNumOfRender: 10, //how many movies to render to DOM
    rawData: [],
    movies: [],
    likes: [],
    currentModal: null,
    clickedFromFavoriteModal: false,
}


$('document').ready(function () {

    /**********************************/
    /*           EVENT HANDLER        */
    /**********************************/
  
    // Hide/Show input validity symbol 
    function showValidityHandler(){

        if($('#inputGen').val().trim().length > 0){
            $('.validity').removeAttr('hidden');
        }
    }

    function addGenreToList(e) {

        e.preventDefault();
        
        var inputGenre = $('#inputGen').val().trim(); console.log(inputGenre);

        // Proceed only when the input is not duplicated
        if (state.searchGenres.indexOf(inputGenre) === -1) {

            // 1. Lender search list
            renderSearchList(inputGenre);

            // 2. Save input to state data
            state.searchGenres.push(inputGenre);

            // 3. Save input data to local storage
            saveToLocalStorage('genres', state.searchGenres);
        }

        // 4. Clear input text
        $('#inputGen').val("");

        // 5. Hide validity symbol
        $('.validity').attr('hidden', 'hidden');
    }
    async function searchBtnHandler(e) {

        e.preventDefault();

        if (state.searchGenres.length > 0) {

            await getMoviesByGenres(state.searchGenres);

            // Take only necessary info from raw data and create each movie obj. Then add all movie objs to one arr.
            createMoviesArr();

            // animation for waiting
            $('#movies').empty();
            var waiting = `<div class="row">
                            <br><br><br><br>
                            <div class="progress">
                               <div class="indeterminate"></div>
                            </div>
                        </div>`

            $('#movies').append(waiting);

            // PASS2: validate/populate movie info into object
            
            // PASS3: Render movies to DOM
            renderMoviesList();

            //? Favorite click test
            state.clickedFromFavoriteModal = false;

        }
        else {

            var message = "No genre entered! Please add a genre to search movies.";
            errorAlertModal(message);
        }

    }
    function favoriteMenuHandler() {

        console.log('menu clicked')
        var l = state.likes.length;

        $('#modal-list').empty();

        // Render favorite movies list
        if (l > 0) {
            var list = "";

            for (var i = 0; i < l; i++) {

                var like = state.likes[i];

                list += `<li class="favorite__list">
                            <a href="#${i}">
                                <img src="${like.imgSmall}" class="favorite__img">
                                <div>
                                    <h6 class="favorite__title">${like.title}</h6>
                                </div>
                            </a>
                        </li>`
            }

        }
        else {
            var list = '<h6> There is no favorite added.</h6>'
        }

        $('#modal-list').append(list);

        state.currentModal = M.Modal.getInstance(document.querySelector('#modal-favorite'));
        state.currentModal.open();

    }
    function gotoFavoriteHandler(e) {

        // If favorite movies list is clicked, render details to DOM
        if(e.target.matches('.favorite__list, .favorite__list *')){

            $('#movies').empty();

            if(state.currentModal){

                // Find which movie is clicked
                var index = e.target.closest('a').getAttribute('href').slice(1);

                // Render that movie to DOM
                renderMovie(state.likes[index], index);

                // Close modal
                state.currentModal.close();
                
                // Favorite click test
                state.clickedFromFavoriteModal = true;

            }
        }
    }
    function favoriteIconHandler(e) {

        // If heart icon is clicked
        if (e.target.matches('.icon-heart, .icon-heart *')) {
            
            // 1. Find which movie is clicked
            var movieHTML = $(e.target).closest('.movie');
            var movieIndex, movieObj;

                // Case 1. When movies are rendered from Favorite modal 
                if(state.clickedFromFavoriteModal){

                    // movieIndex = state.likes's index
                    movieIndex = state.likes.findIndex(function (el) {
                        return el.title === movieHTML.find('.movie__title').text().trim();
                    });

                    // If tring to add movie right after deleting (no movie info in state or local storage), then get all movie data from clicked movie DOM
                    movieObj = movieIndex === -1 ? movieHTML.data('all') : state.likes[movieIndex];

                }
                // Case 2. When movies are rendered from search result
                else{ 

                    // movieIndex = state.movies's index
                    movieIndex = movieHTML.attr('data-movie');
                    movieObj = state.movies[movieIndex];
                }

            // 2. Toggle the movies's property 'isLiked' value (true or false)
            movieObj.isLiked = movieObj.isLiked ? false : true;

            // 3. Toggle heart icon +,- shape
            var useHTML = movieHTML.find('use[id="icon-heart-img"]');
            var path = useHTML.attr('xlink:href').split('-')[2];

            useHTML.attr('xlink:href', `./assets/icons/sprite.svg#icon-heart-${path === "plus" ? 'minus' : 'plus'}`);


            // 4. Save likes to state data 
            if (path === 'plus') { // if isLiked === true

                state.likes.push(movieObj); 
                console.log('new likes obj added: ', state.likes);

            }
            else { // if isLiked === false

                var index = state.likes.findIndex(function (el) {
                    return el.id === movieObj.id;
                })

                state.likes.splice(index, 1); 
                console.log('updated likes obj after deleting: ', state.likes);

            }

            // 5. Save likes to local storage
            saveToLocalStorage('likes', state.likes);

        }
    }

    /**********************************/
    /*              APIs              */
    /**********************************/

    async function getMoviesByGenres(genres) {

        try{
            await $.ajax({
                url: ``,
                method: 'GET'
            }).then(function (response) { state.rawData = response })

    
            if (state.rawData.length === 0) {
    
                var message = "We cannot find any movies under your genres. Please try a different genre.";
                errorAlertModal(message);
    
                throw new Error("🚧 No movie returned. The app has stopped.");
    
            }
        }
        catch{

            var message = "An error occured while geting movies from the server. Please try again later.";
            errorAlertModal(message);

            throw new Error("🚧 Unkown server error occured while getting movies. The app has stopped.");
        }
        

    }

    /**********************************/
    /*              FUNCTION          */
    /**********************************/

    function createMoviesArr() {

        var moviesArr = [];

        var l = state.rawData.length;
        for (var i = 0; i < l; i++) {

            var rawMovie = state.rawData[i];
            var movieObj = {}; // format: { id: , title: , usedIng: , missedIng: , imgSmall: ,imgLarge: }

            // 1. add id, title, img to movieObj
            movieObj.id = rawMovie.id;
            movieObj.title = rawMovie.title;
            movieObj.imgSmall = rawMovie.image;
            movieObj.imgLarge = resizeImg(rawMovie.image);

            // 2. add like factor
            movieObj.isLiked = isLikedOrNot(movieObj);

            moviesArr.push(movieObj);
        }

        // Save the created array to state database
        state.movies = moviesArr;
    }
    function renderMoviesList() {

        $('#movies').empty();

        for (var i = 0; i < state.maxNumOfRender; i++) {

            var movieObj = state.movies[i];

            renderMovie(movieObj, i);
            
        }
    }
    function renderMovie(obj, i = 0) {
       
        // check for 'complete' movie meaning: movie with TBD 
        if (obj.doRender === false) return;

        // create movie HTML
        ???         
            var movie = `<div class="row">
                            <div class="col">
                                
                                <div class="movie card" data-movie="${i}">
                                    <div class="card-image">
                                        <img class="movie__image materialboxed" width="650" src="${obj.imgLarge}">
                                        <a class="activator btn-floating halfway-fab waves-effect waves-light green">
                                            <i class="activator material-icons">
                                                //?
                                            </i>
                                        </a>
                                    </div>
                                    <div class="movie__detail card-content">
                                        <h5 class="movie__title">${obj.title}<span class="favoriteIcon">
                                                <svg class="icon icon-heart">
                                                    <use xlink:href="./assets/icons/sprite.svg#icon-heart-${obj.isLiked ? 'minus' : 'plus'}" id="icon-heart-img"></use>
                                                </svg>
                                            </span>
                                        </h5>
                                        <div class="movie__detail--genres"> 
                                            <div><h6>Genres</h6><ul class="genres--used"></ul></div>                           
                                        </div>
                                        
                                    </div> 
                                    <div class="card-reveal">
                                        <span class="card-title grey-text text-darken-4">Movie Details<i class="right" id="icon-close">x</i></span>
                                        <p>${li}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`

        $('#movies').append(movie);
        renderGenres('.genres--used', obj.usedGenres);
        
        // Add all movie data to movie DOM(using data attr)
        addDataTomovie(obj);
    }
    function renderGenres(addTo, arr) {

        var l = arr.length;

        if (l > 0) {

            var list = "";

            for (var i = 0; i < l; i++) {
                list = list + `<li>${arr[i]}</li>`;
            }
            console.log(list);
            $(`${addTo}`).last().append(list);
        }

    }
    function addDataTomovie(obj){

        var dataAll = {
            id: obj.id,
            imgLarge: obj.imgLarge,
            imgSmall: obj.imgSmall,
            title: obj.title,
            usedGenres: obj.usedGenres,
            doRender: true,
            isLiked: false
        }
        
        $('.movie').last().data('all', dataAll);

    }
    function renderSearchList(str) {

        var li = `<li class="collection" data-genre="${str}">
                    ${str}
                    <span class="delete"> &#215; </span>
                  </li>`;

        $('#searchList').append(li);

    }
    function deleteGenre(e) {

        if (e.target.matches('span[class=delete]')) {

            var li = $(e.target).closest('li');

            // Delete the genre from state data & local storage
            var genre = li.attr('data-genre');
            var index = state.searchGenres.indexOf(genre);

            state.searchGenres.splice(index, 1);
            saveToLocalStorage('genres', state.searchGenres);

            // Delete from DOM
            li.remove();

        }
    }
    function init() {

        // Initiate all Materialize components
        M.AutoInit();

        // render movie image larger
        $('.materialboxed').materialbox();

        // Load from local storage
        importFromLocalStorage('genres', 'searchGenres');
        importFromLocalStorage('likes', 'likes');

        // Render stored search list to DOM
        var l = state.searchGenres.length;

        if (l > 0) {
            for (var i = 0; i < l; i++) {
                renderSearchList(state.searchGenres[i]);
            }
        }
   
    }
    function importFromLocalStorage(item, addTo) {

        var loadedData = localStorage.getItem(item);

        if (loadedData) {
            state[addTo] = JSON.parse(loadedData);
        }
    }
    function saveToLocalStorage(addTo, data) {

        // var duplicateDeletedArr = Array.from(new Set(data));
        localStorage.setItem(addTo, JSON.stringify(data));

    }
    function isLikedOrNot(obj) {

        var likedIds = state.likes.map(function (el) { return el.id });

        // If obj has the same id of likedIds obj, return true
        var index = likedIds.indexOf(obj.id);

        return index === -1 ? false : true;

    }
    function errorAlertModal(message){

        var instance = M.Modal.getInstance(document.querySelector('#modal-alert'));
        
        $('#modal-message').text(message);
        instance.open();

    }
    /**********************************/
    /*              UTILITY           */
    /**********************************/

    // Take only genre's NAME property
    function createIngArr(ingArr) {

        var newArr = ingArr.map(function (el) { return el.name });

        // delete duplicated elements
        newArr = Array.from(new Set(newArr));

        return newArr;
    }
    function resizeImg(str) {

        // Change default size(312x231) to max-size(636x393)
        return str.replace("312x231", "636x393");

    }