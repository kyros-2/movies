import React, { useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import "./style.css";
import { useEffect } from "react";
import { getInfo, getVideo, posterCheck } from "../../api/Post";

export default function MovieInfo() {
  const [movieData, setMovieData] = useState([]);
  const [movieDataVideo, setmovieDataVideo] = useState({});

  let { id } = useParams();

  async function main() {
    setMovieData(await getInfo(id, "movie"));
    setmovieDataVideo(await getVideo(id, "movie"));
  }

  useEffect(() => {
    main();
  }, []);

  const {
    title,
    poster_path,
    overview,
    release_date,
    genres,
    vote_average,
    runtime,
    tagline,
    adult,
  } = movieData;

  const durationSwitch = (num) => {
    let h = parseInt(num / 60);
    let min = num % 60;
    let duration = h === 0 ? `${min}m` : `${h}h ${min}m`;

    return duration;
  };

  const poster_ = posterCheck(poster_path);

  const voteAverage = (vote) => {
    let vote_ = Math.round(vote * 10);

    return `${vote_}%`;
  };

  const scroreColor = (vote) => {
    let userScore = Math.round(vote * 10);

    if (userScore < 30) {
      return "#db3b26";
    } else if (userScore > 30 && userScore < 70) {
      return "#e6bb47";
    } else if (userScore > 60) {
      return "#27a55c";
    }
  };

  return (
    <div id="all" className="content_info_nav">
      <div className="left_part">
        <img
          src={poster_}
          alt="poster"
        />
      </div>

      <div className="right_part">
        <div className="right_part_content">
          {adult ? (
            <div className="adult_container">
              <div>18+</div>
            </div>
          ) : null}

          <div className="title_container">
            <h1>{title}</h1>
          </div>

          {tagline ? (
            <div className="tagline_container">
              <h3>{`"${tagline}"`}</h3>
            </div>
          ) : null}

          <div className="description_container">
            <p>{overview}</p>
          </div>

          <div className="other_info">
            <div>{release_date}</div>
            <div className="line"></div>
            <div>
              {genres
                ? genres.map((ele, index) => (
                    <span key={ele.id}>
                      {index > 0 ? `, ${ele.name}` : ele.name}
                    </span>
                  ))
                : ""}
            </div>
            <div className="line"></div>
            <div>{durationSwitch(runtime)}</div>
          </div>

          <div className="vote_average">
            <h2 style={{ color: scroreColor(vote_average) }}>
              {voteAverage(vote_average)} <span>User Score</span>
            </h2>
          </div>

          <div className="trailler_container">
            {movieDataVideo !== undefined ? (
              <Link
                to={`/movie/${id}/${movieDataVideo.key}`}
                className="trailerLink"
              >
                Watch trailer <FaPlay size={15} />
              </Link>
            ) : (
              <p>Sorry .. Trailer not available</p>
            )}
          </div>
        </div>
      </div>
      <Outlet />
      {/* <button onClick={() => navigate(-1)}>show</button> */}
    </div>
  );
}
