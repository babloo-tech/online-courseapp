import {BACKEND_URL} from '../utils/utils'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import  { VideoContract } from '../contracts/VideoContract'
import axios from 'axios'
import { useDispatch, } from 'react-redux'
import { addToSavedList } from '../slicers/video-slicer'
import store from '../store/store'
import './user-dashboard.css'
import './cart.css'

export function UserDashboard() {
  let dispatch = useDispatch()
  const [cookie, ,removeCookie] = useCookies(['userid'])
  let navigate = useNavigate()

 const [allVideos, setAllVideos] = useState<VideoContract[]>([]);
  const [videos, setVideos] = useState<VideoContract[]>()
  const[searchTerm,setSearchTerm]=useState('')

    function LoadVideos() {
    axios.get(`${BACKEND_URL}/get-videos`).then((response) => {
       setAllVideos(response.data)
       setVideos(response.data)
    })
  }

  useEffect(() => {
    if (cookie['userid'] == undefined) {
      navigate('/user-login')
    } else {
      LoadVideos()
    }
  }, [])

  function UserSignout() {
  const confirmed = confirm("Are you sure you want to logout?");
  if(confirmed){
    removeCookie('userid')
    navigate('/')
  }
   
  }

  function handleSaveClick(video: VideoContract) {
    dispatch(addToSavedList(video))
  }


 function handleClickSearch(e:any) {
  e.preventDefault();
  if (searchTerm.trim()==='') {
    setVideos(allVideos);
  } else {
    if (searchTerm.trim().length >= 5) {
      const result = allVideos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setVideos(result);
     }
  }
 }


  return (
    <div>
      
      <header className="d-flex justify-content-between p-2 fixed-top">
        <h5 className=" ms-5  bi bi-person-fill ">{cookie['userid']}-Dashboard
            <form  method='get' className='input-group mt-3  ms-2' style={{paddingTop:'20px',width:'300px'}}>
          <input   onKeyUp={handleClickSearch} placeholder='Search video....' name='search' onChange={(e)=>setSearchTerm(e.target.value)}  className='form-control' type="text" />
          <button onClick={handleClickSearch} className='bi bi-search btn btn-warning' > </button>
        </form>
        </h5>
      
        <div> <button style={{ marginLeft: '1000px' }} type="submit" onClick={UserSignout} className="btn tbn-link btn-lg">
          <img id='logout-set' src="./logout.jpg" width="40" height="40" className='mt-2' />
        </button>
        </div>
         
        <h2 className="mt-3 ">
          <span className="bi bi-cart4 ">
            {store.getState().videosCount}
          </span>
        </h2>
    
      </header>
      <section className=" z-0 d-flex flex-wrap gap-0 justify-content-evenly mt-5 mx-4">
        {videos?.map((video) => (
          <div  key={video.category_id} className="card m-2 " style={{ maxWidth: '340px' }}>
            <iframe  src={video.url} height="200" w-100 className='rounded '></iframe>
            <div className="card-header text-center">
              <h2>{video.title}</h2>
            </div>
            <div  className="card-body text-center ">{video.description}</div>
            <div className="card-footer">
              <span style={{marginLeft:'75px'}} className="bi bi-hand-thumbs-up ">{video.likes}</span>
              <span className="bi bi-eye mx-4"> {video.views}</span>
              {/* <button  onClick={()=>{handleSaveClick(video)}} className="btn btn-success bi bi-floppy mx-5 
                   mt-1 "> Watch Later</button> */}
              <button
                onClick={() => handleSaveClick(video)}
                className="btn btn-success  mt-1" style={{marginLeft:'75px'}}
              >
                <span  className="bi bi-floppy me-2"></span>
                Watch Later
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
