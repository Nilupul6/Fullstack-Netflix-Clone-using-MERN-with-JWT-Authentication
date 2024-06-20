import "./watch.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useLocation} from "react-router-dom"

const Watch = () => {
  const location = useLocation();
  console.log(location.state);
  const movie = location.state;
  console.log(movie.video)

  return (
    <div className="watch">
      <Link to="/">
      <div className="back">
        <ArrowBackIcon />
        Home
      </div>
      </Link>
      <video className="video" src={movie.video} autoPlay controls></video>
    </div>
  );
};

export default Watch;
