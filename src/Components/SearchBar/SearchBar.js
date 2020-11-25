import React, { useState } from 'react';

export const SearchBar = (props) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => setQuery(e.target.value);

    const search = (key) => {
        if(key.code === 'Enter') {
            // ripulisco il campo di input
            key.nativeEvent.target.value = '';

            const apiKey = 'db123098e9fe123d1b0a79cc401c920d';
            const baseUrl = `https://api.themoviedb.org/3/search/movie/?api_key=${apiKey}&language=it-IT`;
            
            // ricavo i dati dall'api
            fetch(`${baseUrl}&query=${query}`)
                .then(response => response.json())
                .then(data => {
                    let results = data.results;
                    // console.log(results);
                    // setto lo stato dell'apps con i risultati ottenuti
                    props.setMovies(results);
                    if(results.length !== 0) {
                        props.setTitle(`Risultati della ricerca per "${query}"`);
                    } else {
                        props.setTitle(`Nessun risultato trovato per "${query}"`);
                    }
                    // console.log(results);
                });
            
        }
      }

    return (
        <div className='search-bar'>
            <input 
                placeholder='Cerca...' 
                onChange={handleChange}
                onKeyPress={search}
            />
        </div>
    )
}