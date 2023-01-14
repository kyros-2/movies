import React, { useState } from 'react'
import './style.css';
import api, { apiKey } from "../../api/movieApi";
import { useEffect } from "react";
import Card from '../card/Card';

export default function MoviesHome({type}) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const type_ = (x) => {
      if (x === 'movie') {
        return `/movie/popular`;
      }
      else if (x === 'tv') {
        return `/tv/popular`;
      }
      else {
        return '/trending/all/day';
      }
    }

    const loadeMore = () => {
      setPage(page + 1);
      
      api.get(`${type_(type)}?api_key=` + apiKey + `&page=${page}`)
      .then(res => {setData(data.concat(res.data.results))} )
    }
    
    useEffect(() => {
      setPage(page + 1);
      
      api.get(`${type_(type)}?api_key=` + apiKey + `&page=${page}`)
      .then(res => {setData(res.data.results)} )
    }, [type])

  return (
    <div className="all_">
        {/* <button onClick={() => console.log(data)}>show</button> */}
        { data.map(movie => <Card key={movie.id} id={movie.id} title={movie.title ? movie.title : movie.name} poster={movie.poster_path} media_type={movie.media_type ? movie.media_type : type} date={movie.release_date ? movie.release_date : movie.first_air_date} /> )}
        <button type='button' onClick={loadeMore} className='seeMore' >See more</button>
    </div>
  )
}
