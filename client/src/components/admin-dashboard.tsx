
import { useEffect, useState } from "react";
import {BACKEND_URL} from '../utils/utils'
import { useCookies } from "react-cookie"
import { useNavigate , Link} from "react-router-dom"
import type { VideoContract } from "../contracts/VideoContract"
import axios from "axios"
import './admin-dashboard.css'
export function AdminDashboard(){
  const[ , ,removeCookie]=useCookies(['admin_id'])

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
         <header id="head-h" className="d-flex justify-content-between fixed-top p-4">
         <h3 id="font-f1"> <span className="bi bi-lock bg-danger rounded-3 px-2 "></span> Admin Dashboard</h3>
         <button id="btn-b" className="btn  btn-lg text-decoration-none" onClick={handeleSignout}><img id="log" src="logout.jpg" width='50' height='40' /></button>
         </header>
         <section className="fs-5  ">
          <Link to="/add-video" className="btn btn-warning btn-lg bi bi-camera-video "> Add New Video</Link>
            <table className="table table-hover pe-4 p-4">
              <thead>
                  <tr>
                     <th className="ps-5 fs-2">Title</th>
                     <th className="ps-5 fs-2">Preview</th>
                     <th className="ps-4 fs-2">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {
                     videos?.map(video=><tr key={video.video_id}>
                        <td id='main-title' className="ps-4 fw-bold">{video.title}</td>
                         <td>
                          <iframe src={video.url} width="200"  height="100"></iframe>
                         </td>
                         <td>,
                          <Link to={`/edit-video/${video.video_id}`} id="btn-control" className="btn btn-warning "><span className="bi bi-pen-fill "></span></Link>
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