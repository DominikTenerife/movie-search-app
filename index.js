
const form =document.getElementById('search-form')
let watchlistArray = JSON.parse(localStorage.getItem("myWatchlist"))


form.addEventListener("submit", function(e){
    e.preventDefault()
    const movie = document.getElementById("search").value
    let movieSearch = movie.replace(" ", "+")
    let html = ""
    
    async function getMovie () {
        const response = await fetch(`https://www.omdbapi.com/?apikey=c69b53bd&s=${movieSearch}`)
        const filmData = await response.json()
        const movieContainer = document.getElementById("movie-container")
        const movieArray = filmData.Search
        let movieIndexArray = []
        movieArray.forEach(function(movie){
            movieIndexArray.push(movie.imdbID)
        })
        
        
         movieIndexArray.forEach(async function(movieId){
            const answer = await fetch(`https://www.omdbapi.com/?apikey=c69b53bd&i=${movieId}`)
            const data = await answer.json()
            const string = await `
            <div class="movie">
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
                            <label for="add-btn">Watchlist</label>
                            <button id="${data.imdbID}">+</button>
                        </div>
                    </div>
                <p class="plot">${data.Plot}</p>
                    
                </div>
            </div>
            `
 
            html += await string
            const imdb = data.imdbID
           
        })
        
        setTimeout(function (){
            movieContainer.innerHTML = html
            movieIndexArray.forEach(function(data){
                const addBtn =document.getElementById(data)
                let isChosen = false
                addBtn.addEventListener("click", function(){
                    if (!isChosen){
                    watchlistArray.push(data)
                    addBtn.classList.add("added")
                    isChosen = true
                    localStorage.setItem("myWatchlist", JSON.stringify(watchlistArray))
                    }
                    else {
                        addBtn.classList.remove("added")
                        isChosen = false
                        removeItemOnce(watchlistArray, data)
                        localStorage.setItem("myWatchlist", JSON.stringify(watchlistArray))
                    }
                })
            })
            
        },6000)
        
    }
    
    getMovie()

})
       
 function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}      

export default watchlistArray