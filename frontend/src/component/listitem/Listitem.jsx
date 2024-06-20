import "./listitem.scss";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Listitem = ({index, item}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});
    const navigate = useNavigate();

    // const trailer =movie.trailer;
    const trailer = "https://watch.plex.tv/watch/video?uri=provider%3A%2F%2Ftv.plex.provider.discover%2Flibrary%2Fmetadata%2F5d776cac47dd6e001f6ee059%2Fextras%2F620427be133b2900559ccaa1";
    const poster= `https://image.tmdb.org/t/p/original/${movie.imgSm}`

    useEffect(()=>{
        const getMovie = async()=>{
            try {
                const res = await axios.get("http://localhost:8800/api/movies/find/"+item, {
                    headers:{
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjkwYzg0ZTg3Y2ViMzA0ODFjNDFiNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNDU3MjQ1OCwiZXhwIjoxNzE1MDA0NDU4fQ.fiyn5l58qwd21UG9UwS-SGIWI8qiZAQoZWoKRJ_xDDA"
                    }
                });
                setMovie(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        getMovie();
    }, [item]);
    const toComponentB = () => {
        // navigate('/watch', { state: { id: 1, name: 'sabaoon' } });
        navigate('/watch', { state: movie });
      };
      const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    return (
        // Somewhere in your code where you navigate to the Watch component
        // <Link to={{ pathname: "/watch", state: movie }}>
        <div onClick={toComponentB}>
            <div
                className='listitem'
                onMouseEnter={()=>setIsHovered(true)}
                onMouseLeave={()=>setIsHovered(false)}
            >
                <img style={{display: isHovered && "none"}} src={`https://image.tmdb.org/t/p/original/${movie.imgSm}`} alt="" />
                {isHovered && movie && (
                    <>
                        <video src={trailer} poster={poster} autoPlay muted loop></video>
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrowIcon className="icon"/>
                                <AddIcon className="icon"/>
                                <ThumbUpIcon className="icon"/>
                                <ThumbDownIcon className="icon"/>
                            </div>
                            <div className="itemInfoTop">
                                <span className="title">{movie.title}</span>
                                <span>{movie.duration}</span>
                                <span className="limit">+{movie.limit}</span>
                                <span>{movie.year}</span>
                            </div>
                            <div className="desc">
                                {truncateString(movie.desc, 130)}
                            </div>
                            <div className="genre">{movie.genre}</div>
                        </div>
                    </>
                )}
            </div>
        {/* // </Link> */}
        </div>
    );
};

export default Listitem;
