import React, { useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import "./style.css";
import { useEffect } from "react";
import { getInfo, getVideo, posterCheck } from "../../api/Post";

export default function TvInfo() {
  const [tvData, setTvData] = useState([]);
  const [tvDataVideo, setTvDataVideo] = useState({});
  const [loaded, setLoaded] = useState(false);
  
  let { id } = useParams();

  const scrollHeight = () => {
    if (loaded) {
      const parentElement = document.querySelector(".s_body_inner").clientHeight;
      const childElement = document.querySelector(".for_scrolling").clientHeight;
      const scrollHide = document.querySelector(".scroll");
      
      
      if (childElement > parentElement) {
        scrollHide.classList.remove("none");
      } else {
        scrollHide.classList.add("none");
      }
    }
  };
  scrollHeight();
  
  const checkScroll = (e) => {
    const parentElement = document.querySelector(".s_body_inner").clientHeight;
    const childElement = document.querySelector(".for_scrolling").clientHeight;
    const scroll_ = e.scrollTop + parentElement;
    const scrollHide = document.querySelector(".scroll");
    

    if (scroll_ > childElement - 5) {
      scrollHide.classList.add("none");
    } else {
      scrollHide.classList.remove("none");
    }
  }


  async function main() {
    setTvData(await getInfo(id, "tv"));
    setTvDataVideo(await getVideo(id, "tv"));
  }

  useEffect(() => {
    main();
  }, []);

  const {
    name,
    poster_path,
    overview,
    genres,
    vote_average,
    tagline,
    adult,
    seasons,
    number_of_seasons,
    number_of_episodes,
    first_air_date,
  } = tvData;

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

  const seasons_ep = (s, type) => {
    if (type === "seasons") {
      return s > 1 ? `${s} seasons` : `${s} season`;
    } else if (type === "episodes") {
      return s > 1 ? `${s} episodes` : `${s} episode`;
    }
  };

  return (
    <div id="all" className="content_info_nav" onLoad={() => setLoaded(true)}>
      <div className="left_part">
        <img src={poster_} alt="poster" />
      </div>
      <div className="right_part">
        <div className="right_part_content">
          {adult ? (
            <div className="adult_container">
              <div>18+</div>
            </div>
          ) : null}

          <div className="title_container">
            <h1>{name}</h1>
          </div>

          {tagline ? (
            <div className="tagline_container">
              <h3>{`"${tagline}"`}</h3>
            </div>
          ) : null}

          <div className="description_container">
            <p>
              {overview
                ? overview
                : "We don't have an overview translated in English"}
            </p>
          </div>

          <div className="other_info">
            <div>{first_air_date}</div>
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
            <div>{seasons_ep(number_of_episodes, "episodes")}</div>
          </div>

          <div className="vote_average">
            <h2 style={{ color: scroreColor(vote_average) }}>
              {voteAverage(vote_average)} <span>User Score</span>
            </h2>
          </div>

          <div className="seasons">
            <h2 className="s_title">
              {seasons_ep(number_of_seasons, "seasons")} :
            </h2>
            <div className="s_body">
              <div className="scroll"></div>
              <div className="s_body_inner" onScroll={(e) => checkScroll(e.target)}>
                <div className="for_scrolling">
                  {seasons
                    ? seasons.map((s) => (
                        <Link
                          to={`season/${s.season_number}`}
                          key={s.id}
                          className="s_link"
                        >
                          {s.name}
                        </Link>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="trailler_container">
            {tvDataVideo !== undefined ? (
              <Link
                to={`/tv/${id}/${tvDataVideo.key}`}
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
      {/* <button onClick={() => console.log(parentHeight, childHeight)}>show</button> */}
      <Outlet />
    </div>
  );
}
