import React from "react";
import { useState, useEffect } from "react";
import api, { apiKey } from "../../api/movieApi";
import { useParams, Link, Outlet } from "react-router-dom";
import { FaPlay } from 'react-icons/fa';

export default function SeasonInfo() {
  const [seasonData, setSeasonData] = useState([]);
  const [seasonVideo, setSeasonVideo] = useState([]);

  let { id, s_id } = useParams();

  return (
    <div id="all" className="content_info_nav">
      <h1>{id + " / " + s_id}</h1>
      <Outlet />
      {/* <button onClick={() => console.log(seasonVideo)}>show</button> */}
    </div>
  );
}