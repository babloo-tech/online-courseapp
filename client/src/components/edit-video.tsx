
import {BACKEND_URL} from '../utils/utils'
import { useFormik } from 'formik'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { CategoryContract } from '../contracts/CategoryContract'
import type { VideoContract } from '../contracts/VideoContract'


export function EditVideo(){

let navigate=useNavigate()
let params=useParams()

  const[videos,setVideos]=useState<VideoContract[]>([{video_id:0,title:'',description:'',comments:'',likes:0,views:0,url:'',category_id:0}])
  const[categories,setCategories]=useState<CategoryContract[]>()
  const formik=useFormik({
    initialValues:{
      video_id: videos[0].video_id,
      title: videos[0].title,
      description: videos[0].description,
      comments: videos[0].comments,
      likes: videos[0].likes,
      views:videos[0].views,
      url:videos[0].url,
      category_id:videos[0].category_id
    },
    onSubmit:(video=>{
      axios.put(`${BACKEND_URL}/edit-video/${params.id}`,video)
      .then(()=>{
        
      })
      alert('Video Modified Successfully')
      navigate('/admin-dashboard')
    }),
    
   enableReinitialize:true
  })

  function LoadCategories(){
    axios.get(`${BACKEND_URL}/get-categories`)
    .then(response=>{
      response.data.unshift({category_id:-1,category_name:'Select Category'})
     setCategories(response.data)

    })
  }

  function LoadVideos(){
    axios.get(`${BACKEND_URL}/get-video/${params.id}`)
    .then(response=>{
      setVideos(response.data)
      console.log(response)
    })
  }

  useEffect(()=>{
   LoadCategories()
   LoadVideos()
  },[])

  return(
    <div className='bg-dark text-white fs-5 p-5 m-4 rounded-2' style={{maxWidth:'600px'}}>
      <h2 className='text-center ps-5 p-2 fw-bold'>Edit Video</h2>
      <form onSubmit={formik.handleSubmit}>
        <dl className='row'>
        <dt className='col-4'>Video Id</dt>
        <dd className='col-8'><input className='form-control' type="number" value={formik.values.category_id} name='video_id' onChange={formik.handleChange} /></dd>
        <dt className='col-4'>Title</dt>
        <dd  className='col-8'><input className='form-control' type="text" value={formik.values.title} name='title' onChange={formik.handleChange} /></dd>
        <dt  className='col-4'>Description</dt>
        <dd  className='col-8'><input className='form-control' type="text" value={formik.values.description} name='description' onChange={formik.handleChange}/></dd>
        <dt  className='col-4'>Comments</dt>
        <dd  className='col-8'><input className='form-control' type="text"name='comments' value={formik.values.comments} onChange={formik.handleChange} /></dd>
        <dt  className='col-4'>Likes</dt>
        <dd  className='col-8'><input className='form-control' type="number" value={formik.values.likes}  name='likes' onChange={formik.handleChange}/></dd>
        <dt  className='col-4'>Views</dt>
        <dd  className='col-8'><input className='form-control' type="number"name='views' value={formik.values.views} onChange={formik.handleChange}/></dd>
        <dt  className='col-4'>Urls</dt>
        <dd  className='col-8'><input className='form-control' type="text"  value={formik.values.url} name='url' onChange={formik.handleChange}/></dd>
        <dt  className='col-4'>Category </dt>
        <dd className='col-8'>
           <select onChange={formik.handleChange} className='form-select' name='category_id' value={formik.values.category_id} >
        
             {
              categories?.map(category=>
              <option key={category.category_id} value={category.category_id}>{category.category_name}</option>)
            
             }
           </select>
          
        </dd>
        </dl>
        <button type='submit' className='btn btn-primary  mx-3'>Save</button>
        <Link to="/admin-dashboard" className='btn btn-danger'>Cancel</Link>
        </form>
    </div>
   )
   
 }