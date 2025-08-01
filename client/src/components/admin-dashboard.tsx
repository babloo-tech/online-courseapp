
import { useEffect, useState } from "react";
import {BACKEND_URL} from '../utils/utils'
import { useCookies } from "react-cookie"
import { useNavigate , Link} from "react-router-dom"
import type { VideoContract } from "../contracts/VideoContract"
import axios from "axios"
export function AdminDashboard(){
  const[cookie,setCookie,removeCookie]=useCookies(['admin_id'])

  let navigate=useNavigate()

  const[videos,setVideos]=useState<VideoContract[]>();

  function LoadVideos(){
    axios.get(`${BACKEND_URL}/get-videos`)
    .then(response=>{
      setVideos(response.data)
    })
  }
  
  useEffect(()=>{
      LoadVideos()
  },[])

  function handeleSignout(){
    removeCookie('admin_id')
    navigate('/')
  }


  return(
    <div className="p-3 z-2">
         <header className="d-flex justify-content-between fixed-top p-4">
         <h2>Admin Dashboard</h2>
         <button className="btn btn-li btn-lg text-decoration-none" onClick={handeleSignout}><img src="logout.jpg" width='50' height='50'/></button>
         </header>
         <section className="fs-5 ">
          <Link to="/add-video" className="btn btn-warning btn-lg bi bi-camera-video"> Add New Video</Link>
            <table className="table table-hover p-4">
              <thead>
                  <tr>
                     <th className="ps-5 fs-2">Title</th>
                     <th className="ps-5 fs-2">Preview</th>
                     <th className="ps-4 fs">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {
                     videos?.map(video=><tr key={video.video_id}>
                        <td className="ps-4">{video.title}</td>
                         <td>
                          <iframe src={video.url} width="200"  height="100"></iframe>
                         </td>
                         <td>,
                          <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning"><span className="bi bi-pen-fill"></span></Link>
                          <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger mx-3"><span className="bi bi-trash-fill"></span></Link>
                         </td>
                     </tr>)
                  }
              </tbody>
            </table>
         </section>
    </div>
  )
  
}