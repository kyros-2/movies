import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getNumberMovie_tv } from "../../api/Post";
import "./style.css";

export default function Search() {
  const [numMovie, setNumMovie] = useState(0);
  const [numTv, setNumTv] = useState(0);
  
  let { keyWord } = useParams();

  async function numChangeMovie() {
    setNumMovie(await getNumberMovie_tv("movie", keyWord));
  }
  async function numChangeTv() {
    setNumTv(await getNumberMovie_tv("tv", keyWord));
  }

  useEffect(() => {
    numChangeMovie();
    numChangeTv();
  }, [keyWord])

  return (
    <div className="all_search" data-keyword={keyWord}>
      <div className="type_btn">
        <NavLink className="type_btn_" to={`/search/movie/${keyWord}`} >({numMovie.total_results}) Movies</NavLink>
        <NavLink className="type_btn_" to={`/search/tv/${keyWord}`} >({numTv.total_results}) Tv Show</NavLink>
      </div>
      <Outlet />
    </div>
  );
}