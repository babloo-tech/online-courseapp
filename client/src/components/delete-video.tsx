import {BACKEND_URL} from '../utils/utils'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { VideoContract } from '../contracts/VideoContract'

export function DeleteVideo(){
 
  let navigate=useNavigate()
  let params=useParams()
  
    const[videos,setVideos]=useState<VideoContract[]>([{video_id:0,title:'',description:'',comments:'',likes:0,views:0,url:'',category_id:0}])
   
    function LoadVideos(){
      axios.get(`${BACKEND_URL}/get-video/${params.id}`)
      .then(response=>{
        setVideos(response.data)
      })
    }
  
    useEffect(()=>{
     LoadVideos()
     
    },[]) 

    function handleDeleteClik(){
      axios.delete(`${BACKEND_URL}/delete-video/${params.id}`)
      .then(()=>{

      })
      alert("Video Delete Succssfully")
      navigate('/admin-dashboard')
    }
  return(
    <div className='p-5 m-4 bg-dark text-white rounded-2' style={{maxWidth:'500px'}}>
      <h2>Delete Video</h2>
      <h4>Ary you sure?</h4>
      <dl>
        <dt>Title</dt>
        <dd>{videos[0].title}</dd>
        <dt style={{marginLeft:'120px'}} className='mb-3 fs-4'>Preview</dt>
        <dd>
           <iframe  src={videos[0].url} width={260} height={200} ></iframe>
        </dd>
      </dl>
      <button onClick={handleDeleteClik} type='submit' className='btn btn-warning mx-2'>Delete</button>
      <Link to="/admin-dashboard" className='btn btn-danger'>Cancel</Link>
    </div>
  )
}