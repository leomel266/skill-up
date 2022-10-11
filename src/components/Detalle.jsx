import React from "react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Detalle = () => {
  let token = sessionStorage.getItem("token");

  let query = new URLSearchParams(window.location.search);
  // eslint-disable-next-line no-lone-blocks
  {
    /* .search se conoce tradicionalmente como queryString, que es todo lo que viaja
    despues del signo de pregunta */
  }
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=15bce1a63182b8afc7da09cbe3911477&language=en-US`;
    axios.get(endPoint).then((response) => {
      const movieData = response.data;
      setTimeout(() => {
        setMovie(movieData);
      }, 400);
    });
  }, [movieID]);

  return (
    <>
      {!token && <Navigate to='/' />}
      {!movie && (
        <div class='spinner-border' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      )}
      {movie && (
        <>
          <h2 className='text-center'>{movie.title}</h2>
          <div className='row mt-4'>
            <div className='col-4'>
              <img
                alt='moviePoster'
                className='img-fluid'
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </div>
            <div className='col-8'>
              <h5>Fecha de estreno: {movie.release_date}</h5>
              <h5>Reseña:</h5>
              <p>{movie.overview}</p>
              <h5>Rating: {movie.vote_average}</h5>
              <h5>Generos:</h5>
              <ul>
                {movie.genres.map((oneGenre) => (
                  <li key={oneGenre.id}>{oneGenre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detalle;
