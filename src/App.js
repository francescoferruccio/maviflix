import './App.scss';
import { useEffect, useState } from 'react';
import { NavBar } from './Components/NavBar/NavBar';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { MovieCard } from './Components/MovieCard/MovieCard';
import { MovieModal } from './Components/MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState();
  const [showModal, setShowModal] = useState(false);
  const [movieModal, setMovieModal] = useState(null);
  const [generi, setGeneri] = useState({});

  // ricavo i film più popolari da visualizzare al caricamento della pagina
  useEffect(() => { fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=db123098e9fe123d1b0a79cc401c920d&language=it-IT')
  .then(response => response.json())
  .then(data => {
      let results = data.results;
      // console.log(results);
      setMovies(results);
      setTitle('Film più popolari');
  }) }, []);

  // ricavo la lista di tutti i generi
  useEffect(() => { 
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=db123098e9fe123d1b0a79cc401c920d&language=it-IT')
    .then(response => response.json())
    .then(data => {
        // console.log(data.genres);
        setGeneri(data.genres);
  }) }, []);

  return (
    <div className="App">
      <NavBar 
        title={title}
        setTitle={setTitle}
        setMovies={setMovies}
      />
      <SearchBar
        setMovies={ setMovies }
        setTitle={setTitle}
      />
      <div className="title">
        <h2>{ title }</h2>
      </div>
      <div className='movie-container'>
          { movies.map(movie => {
              return (
                  <MovieCard 
                    key={movie.id}
                    movie={movie}
                    generi={generi}
                    setShowModal={setShowModal}
                    setMovieModal={setMovieModal}
                  />
              )
          }) }
      </div>
      <MovieModal 
        movie={movieModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default App;
