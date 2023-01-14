import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import './style.css'

export default function Trailer() {
    const { idPlay } = useParams();
    const navigate = useNavigate();

    function goBack() {
      navigate(-1);
    }

  return (
    <div className='all_Trailer'>
      <button type='button' className='backBtn' onClick={goBack}><BiArrowBack /></button>
      <div className='trailerContainer'>
        <iframe src={"https://www.youtube.com/embed/" + idPlay} allowFullScreen></iframe>
      </div>
    </div>
  )
}
