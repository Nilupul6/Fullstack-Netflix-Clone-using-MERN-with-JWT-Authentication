import { AcUnit} from "@mui/icons-material"
import "./home.scss"
import Navbar from "../../component/navbar/Navbar"
import Featured from "../../component/featured/Featured"
import List from "../../component/list/List"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(()=>{
    const getRandomLists = async() =>{
      try {
        const res = await axios.get(
          `http://localhost:8800/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
          {
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjkwYzg0ZTg3Y2ViMzA0ODFjNDFiNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNDU3MjQ1OCwiZXhwIjoxNzE1MDA0NDU4fQ.fiyn5l58qwd21UG9UwS-SGIWI8qiZAQoZWoKRJ_xDDA"
          }
        });
        setLists(res.data);
        console.log(lists)
      } catch (error) {
        console.log(error)
      }
    }
    getRandomLists();
  },[type,genre]);


  return (
    <div className="home">
        <Navbar />
        <Featured type={type} />
        {lists.map((list)=>(
          <List list={list}/>
        ))}
        
       

    </div>
  )
}

export default Home