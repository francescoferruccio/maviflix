import { useEffect, useState } from 'react';
import { ActorCard } from '../ActorCard/ActorCard';

export function MovieModal(props) {
    const [cast, setCast] = useState(null);

    useEffect(() => {
        console.log('carico attori');
        if(props.movie) {
            const movie_id = props.movie.id;
            const castUrl = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=db123098e9fe123d1b0a79cc401c920d&language=it-IT`
            console.log(movie_id);
            fetch(castUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.cast);
                    setCast(data.cast);
                });
        }
    }, [props.movie]);

    if(!props.movie) {
        return null;
    }

    
    const closeModal = () => {
        // chiudo la modale
        props.setShowModal(false);
    }

    // setto dinamicamente l'immagine di background
    let image = null;
    if(props.movie.backdrop_path) {
        let baseUrl = 'https://image.tmdb.org/t/p/original';
        image = <img src={`${baseUrl}${props.movie.backdrop_path}`} alt={`${props.movie.id}_bg`} />
    }

    // mappo i generi del film ricevuti e li inserisco in una lista
    const generi = props.movie.generi.map((genere) => 
        <li key={genere.id}>{ genere.name }</li>
    );
    let listaGeneri = null;
    if(generi.length > 0) { 
        listaGeneri = <ul>Genere: { generi }</ul>
    }

    // controllo che il film abbia una data di uscita
    let anno = null;
    if(props.movie.release_date) {
        anno = <h5>Anno: {props.movie.release_date.slice(0, 4)}</h5>
    }

    // controllo che il film abbia dei voti
    let voti = null;
    if(props.movie.vote_count > 0) {
        voti = <h4>Media voto: {props.movie.vote_average} ({props.movie.vote_count} voti)</h4> 
    }

    // controllo che il film abbia una descrizione
    let overview = 'Nessuna descrizione disponibile.'
    if(props.movie.overview !== '') { overview =  props.movie.overview}

    // listo i primi 10 attori
    let castList = null;
    if(cast) {
        castList = cast.slice(0, 10).map(actor => <ActorCard actor={ actor } />);
    }

    if(props.showModal) {
        return (
            <div className="movie-modal">
                { image }
                <div className="overlay">
                    <div className="close-modal" onClick={closeModal}>x</div>
                    <div className="movie-details">
                        <h2 className="title">{props.movie.title}</h2>
                        { voti }
                        <p>{overview}</p>
                        { listaGeneri }
                        { anno }
                        <div className="cast">
                            <h4>Cast</h4>
                            { castList }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}