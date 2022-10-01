import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal != null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  return (
    <>
      <div className="row">
        {/*Estructura base */}
        {favorites.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card">
                <img
                  src={oneMovie.imgURL}
                  className="card-img-top"
                  alt="dsafas"
                />
                {/* <button
                  className="favourite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  
                </button> */}
                <div className="card-body">
                  <h5 className="card-title">
                    {oneMovie.title.substring(0, 30)}...
                  </h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 80)}...
                  </p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
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

export default Favoritos;
