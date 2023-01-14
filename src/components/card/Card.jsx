import React from "react";
import './style.css';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { posterCheck } from "../../api/Post";

export default function Card({poster, title, id, media_type, date}) {
  const poster_ = posterCheck(poster);

  return (
    <Link to={`/${media_type}/` + id} className='movie_item' title={title}>
      <img src={poster_} alt={title} />
      <div className="text">
        <h1 className="title" >{title}</h1>
        <h5>{date}</h5>
      </div>
    </Link>
  );
}
