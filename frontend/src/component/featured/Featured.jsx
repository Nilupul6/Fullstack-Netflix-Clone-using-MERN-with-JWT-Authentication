import "./featured.scss"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = ({type}) => {
  const [content, setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async()=>{
      try {
        const res = await axios.get(`http://localhost:8800/api/movies/random/one?type=${type}`,{
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjkwYzg0ZTg3Y2ViMzA0ODFjNDFiNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNDU3MjQ1OCwiZXhwIjoxNzE1MDA0NDU4fQ.fiyn5l58qwd21UG9UwS-SGIWI8qiZAQoZWoKRJ_xDDA"
          }
        });
        setContent(res.data[0]);
        console.log(content);
      } catch (error) {
        console.log(error)
      }
    }
    getRandomContent();
  },[type]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
        return str.slice(0, num) + '...';
    } else {
        return str;
    }
  }

  return (
    <>
    <div className='featured'>
      {type && (
        <div className="category">
          <span>{type === "Movie" ? "Movies" : "Series"}</span>
          <select name="Genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
        <img className="bimg" src={`https://image.tmdb.org/t/p/original/${content.img}`} alt="" />
    
        <div className="info">
            <span className="title">{content.title}</span>
        
            <span className="desc">
                {truncateString(content.desc, 180)}
            </span>

            <div className="buttons">
                <button className="play"><PlayCircleIcon/><span>Play</span></button>
                <button className="more"><InfoOutlinedIcon/><span>More</span></button>
            </div>

        </div>
    </div>
    </>
    
  )
}

export default Featured