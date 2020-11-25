export function NavBar(props) {
    // funziona che recupera i film più popolari
    const getPopular = () => {
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=db123098e9fe123d1b0a79cc401c920d&language=it-IT')
            .then(response => response.json())
            .then(data => {
                let results = data.results;
                // console.log(results);
                props.setMovies(results);
                props.setTitle('Film più popolari');
            })
        }

    return (
        <nav>
            <h1 onClick={getPopular}>MAVIFLIX</h1>
        </nav>
    )
}