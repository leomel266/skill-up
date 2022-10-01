import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

const Listado = (props) => {
  let token = sessionStorage.getItem("token");

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=15bce1a63182b8afc7da09cbe3911477&language=en-US&page=1";
    axios.get(endPoint).then((response) => {
      const apiData = response.data;
      setMovieList(apiData.results);
    })
    .catch(err=>{
      swAlert(<h2>Hubo errorés, intenta mas tarde</h2>)
    })
    
  }, [setMovieList]);

  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="row">
        {/*Estructura base */}
        {movieList.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="dsafas" />
                {/* <button className="favourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={oneMovie.id}>🖤</button> */}
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title.substring(0,30)}...</h5>
                  <p className="card-text">{oneMovie.overview.substring(0, 80)}...</p>
                  <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">
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

export default Listado;
