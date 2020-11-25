export function MovieCard(props) {

    const showModal = () => {
        // console.log(props);
        props.setShowModal(true);
        
        // cerco i generi del film cliccato
        let generi = [];
        props.movie.genre_ids.forEach(genere => {
            // console.log('genere', genere);
            props.generi.forEach(allGenere => {
                // console.log('allGenere', allGenere);
                if(genere === allGenere.id) {
                    generi.push(allGenere);
                }
            })
        });
        props.movie.generi = generi;

        props.setMovieModal(props.movie);
    }
    
    let imgBaseUrl = "http://image.tmdb.org/t/p/w342";
    let poster_path = (props.movie.poster_path == null) ? './images/poster_placeholder.png' :  `${imgBaseUrl}${props.movie.poster_path}`;

    return(
        <div className='movie-card' onClick={showModal}>
            <img className='poster' src={poster_path} alt={props.movie.title}></img>
            <div className="movie-info">
                <h3>{props.movie.title}</h3>
            </div>
        </div>
    )
}