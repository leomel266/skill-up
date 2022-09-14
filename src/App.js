import "./App.css";
import { Routes, Route } from "react-router-dom";
//Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

function App() {

  
  const addOrRemoveFromFavs=e=>{
    
    const favMovies= localStorage.getItem('favs');
  
    let tempMoviesInFavs;
  
    if(favMovies === null){
      tempMoviesInFavs=[]
  
    }else{
      tempMoviesInFavs=JSON.parse(favMovies)
    }


    const btn= e.currentTarget();
    const parent= btn.parentElement;
    const imageURL= parent.querySelector('img').getAttribute('src');
    const title= parent.querySelector('h5').innerText();
    const overview= parent.querySelector('p').innerText();
    const movieData={
      imageURL, title, overview,
      id: btn.dataset.movieId
    }
    let movieIsInArray= tempMoviesInFavs.find(oneMovie =>{
      return oneMovie.id === movieData.id
    });
    if(!movieIsInArray){
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
    }else{
      let moviesLeft= tempMoviesInFavs.filter(oneMovie=>{
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
    }
  }
  return (
    <>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/listado" element={(props)=><Listado {...props} addOrRemoveFromFavs={this.state.addOrRemoveFromFavs}/>} exact={true} />
          <Route path="/Detalle" element={<Detalle />} />
          <Route path="/resultados" element={(props)=><Resultados {...props} addOrRemoveFromFavs={this.state.addOrRemoveFromFavs}/>} exact={true} />
          <Route path="/favoritos" element={<Favoritos/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
