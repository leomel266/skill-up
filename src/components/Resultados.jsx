import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swAlert from "@sweetalert/with-react";

const Resultados = () => {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");
  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=15bce1a63182b8afc7da09cbe3911477&language=en-US&page=1&query=${keyword}`;
    axios
      .get(endPoint)
      .then((response) => {
        const movieArray = response.data.results;
        if (movieArray.length === 0) {
          swAlert(<h5>Tu busqueda no arrojo resultados</h5>);
        }
        setMoviesResults(movieArray);
      })
      .catch((err) => {});
  }, [keyword]);

  return (
    <>
      <h2>
        Buscaste: <em>{keyword}</em>
      </h2>
      {moviesResults.length === 0 && (
        <div class='spinner-border' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      )}
      <div className='row'>
        {/*Estructura base */}
        {moviesResults.map((oneMovie, idx) => {
          return (
            <div className='col-4' key={idx}>
              <div className='card'>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className='card-img-top'
                  alt='dsafas'
                />
                <div className='card-body'>
                  <h5 className='card-title'>
                    {oneMovie.title.substring(0, 30)}...
                  </h5>
                  <p className='card-text'>
                    {oneMovie.overview.substring(0, 80)}...
                  </p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className='btn btn-primary'>
                    View detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Resultados;
