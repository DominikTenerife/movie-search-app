let watchlistArray = JSON.parse(localStorage.getItem("myWatchlist"))
let html = ''


function getMovieData() {
    watchlistArray.forEach(async function (movieId){
        const response = await fetch(`https://www.omdbapi.com/?apikey=c69b53bd&i=${movieId}`)
        const data = await response.json()
        const string = await `
           
            <div class="movie" id="movie${data.imdbID}">
                <div class="img-container">
                    <image class="main-img" src=${data.Poster}>
                </div>
                <div>
                    <div class="movie-title">
                        <h2>${data.Title}</h2>
                        <p class="rating">⭐️ ${data.imdbRating}</p>
                    </div>
                    <div class="basic-data-container">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <div class="add">
                            <label for="remove-btn">Watchlist</label>
                            <button id="${data.imdbID}">-</button>
                        </div>
                    </div>
                    <p class="plot">${data.Plot}</p>
                    
                </div>
            </div>
            `
            
            html += await string
            
        
    })
    }
    
    
    function displayMovies () {setTimeout(function (){
        const movieContainer = document.getElementById("movie-container")
        
        movieContainer.innerHTML = html
        
        watchlistArray.forEach(function(data){
                const removeBtn =document.getElementById(data)
                removeBtn.addEventListener("click", function(){
                    const movieDiv = document.getElementById(`movie${data}`)
                    movieDiv.classList.add("remove")
                    removeItemOnce(watchlistArray, data)
                    localStorage.setItem("myWatchlist", JSON.stringify(watchlistArray))
                })
            })
   
        },1000)}

getMovieData()
displayMovies()

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}      