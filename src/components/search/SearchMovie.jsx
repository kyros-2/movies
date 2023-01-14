import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { searchData } from "../../api/Post";
import Card from "../card/Card";

export default function SearchMovie() {
  const [dataMovie, setDataMovie] = useState([]);
  const [checkPage, setCheckPage] = useState([]);
  const [moviePage, setMoviePage] = useState(1);

  let { keyWord } = useParams();

  async function keyWordChange() {
    setDataMovie(await searchData("movie", keyWord, moviePage));
  }

  async function pageChangeMovie() {
    setDataMovie(
      dataMovie.concat(await searchData("movie", keyWord, moviePage))
    );
  }

  async function checkNextPage() {
    setCheckPage(await searchData("movie", keyWord, moviePage + 1));
  }

  const pageIncrement = () => {
    setMoviePage(moviePage + 1);
  };

  useEffect(() => {
    setMoviePage(1);
    checkNextPage();
    keyWordChange();
  }, [keyWord]);

  useEffect(() => {
    pageChangeMovie();
    checkNextPage();
  }, [moviePage]);

  return (
    <>
      <div className="search_movies">
        {dataMovie.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            media_type={"movie"}
            date={movie.release_date}
          />
        ))}

        {checkPage.length > 0 ? (
          <button type="button" className="seeMore" onClick={pageIncrement}>
            See more
          </button>
        ) : null}
      </div>
    </>
  );
}
