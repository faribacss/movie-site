// https://www.themoviedb.org/  سایت درخواست زدن به فیلم

// 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'  سایت API


const API_URL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1";  //اگه روش کلیک کنیم مشخصاتی که بعدا قراره ازشون استفاده کنیم و درخواست بزنیم بهشون رو میاره برامون

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API ='https://api.themoviedb.org/3/search/movie?api_key=edd746246a72e19e99f9fc701ec87c86&query="';

const main = document.getElementById('main');
const form = document.getElementById('form')
const search = document.getElementById('search');


getMovie(API_URL);

async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);

}

function showMovies(movies){
    main.innerHTML = '';
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;

        const formattedVote = vote_average.toFixed(1);
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(formattedVote)}">${formattedVote}<span>
                </div>
                <div class="overview">
                    <h3>Summery</h3>
                   ${overview}
                </div>`;
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote){

    if (vote >= 8) {
        return 'green';
    }
    else if(vote < 8 && vote >= 5){
        return 'orange';
    }
    else{
        return 'red';
    }

}

function toggleElement(){
    const element = document.getElementById("myElement");
    if (element.style.display === 'none') {
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovie(SEARCH_API + searchTerm);

        search.value = '';
    }
    else{
        window.location.reload();
    }
})
