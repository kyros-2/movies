import React from "react";
import './app.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import MoviesHome from "./components/movies_home/MoviesHome";
import MovieInfo from "./components/movie_info/MovieInfo";
import TvInfo from "./components/tv/Tvinfo";
import SeasonInfo from "./components/season/SeasonInfo";
import Search from "./components/search/Search";
import Trailer from "./components/trailer/Trailer";
import SearchMovie from "./components/search/SearchMovie";
import SearchTv from "./components/search/SearchTv";



function App() {
  return (
    <div className="app" >
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MoviesHome />} />

        <Route path="/movie"  >
          <Route index element={<MoviesHome type="movie" />} />
          <Route path=":id" element={<MovieInfo />} >
            <Route path=":idPlay" element={<Trailer />} />
          </Route>
        </Route>

        <Route path="/tv"  >
          <Route index element={<MoviesHome type="tv" />} />
          <Route path=":id" element={<TvInfo />} >
            <Route path=":idPlay" element={<Trailer />} />
          </Route>

          <Route path=":id/season/:s_id" element={<SeasonInfo />} >
            <Route path=":idPlay" element={<Trailer />} />
          </Route>

        </Route>

        <Route path="/search/" element={<Search />} >
          <Route path="movie/:keyWord" element={<SearchMovie />} />
          <Route path="tv/:keyWord" element={<SearchTv />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
