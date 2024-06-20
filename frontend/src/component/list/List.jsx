import "./list.scss"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Listitem from "../listitem/Listitem";
import { useRef, useState } from "react";


const List = ({list}) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false)

  const listRef = useRef();

  const handleClick = (direction)=>{
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x-50;
    if(direction === "left" && slideNumber > 0){
      setSlideNumber(slideNumber-1)
      listRef.current.style.transform =  `translateX(${230+distance}px)`
    }
    if(direction === "right" && slideNumber < 4){
      setSlideNumber(slideNumber+1)
      listRef.current.style.transform =  `translateX(${-230+distance}px)`
    }
    console.log(distance)
  }
  return (
    <div className="list">
        <span className="listTitle">{list.title}</span>
        <div className="wrapper">
            <ArrowBackIosNewOutlinedIcon 
            className="sliderArrow left" 
            onClick={()=>handleClick("left")} 
            style={{display: !isMoved && "none"}}/>
            <div className="container" ref={listRef}>
              {list.content.map((item,i)=>(
                <Listitem index={i} item={item}/>
              ))}
              
            </div>
            <ArrowForwardIosOutlinedIcon className="sliderArrow right" onClick={()=>handleClick("right")}/>
        </div>
    </div>
  )
}

export default List