import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchData } from "../../api/Post";
import Card from "../card/Card";

export default function SearchTv() {
  const [dataTv, setDataTv] = useState([]);
  const [checkPage, setCheckPage] = useState([]);
  const [tvPage, setTvPage] = useState(1);

  let { keyWord } = useParams();

  async function keyWordChange() {
    setDataTv(await searchData("tv", keyWord, tvPage));
  }

  async function pageChangeMovie() {
    setDataTv(dataTv.concat(await searchData("tv", keyWord, tvPage)));
  }

  async function checkNextPage() {
    setCheckPage(await searchData("tv", keyWord, tvPage + 1));
  }

  const pageIncrement = () => {
    setTvPage(tvPage + 1);
  };

  useEffect(() => {
    setTvPage(1);
    checkNextPage();
    keyWordChange();
  }, [keyWord]);

  useEffect(() => {
    pageChangeMovie();
    checkNextPage();
  }, [tvPage]);

  return (
    <div className="search_tv">
      {dataTv.map((tv) => (
        <Card
          key={tv.id}
          id={tv.id}
          title={tv.name}
          poster={tv.poster_path}
          media_type={"tv"}
          date={tv.first_air_date}
        />
      ))}

      {checkPage.length > 0 ? (
        <button type="button" className="seeMore" onClick={pageIncrement}>
          See more
        </button>
      ) : null}
    </div>
  );
}
