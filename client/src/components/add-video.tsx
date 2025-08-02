import {BACKEND_URL} from '../utils/utils'
import { useFormik } from 'formik'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { CategoryContract } from '../contracts/CategoryContract'
export function AddVideo(){
   
  let navigate=useNavigate()
  const[categories,setCategories]=useState<CategoryContract[]>()
  const formik=useFormik({
    initialValues:{
      video_id:0,
      title:'',
      description:'',
      comments:'',
      likes:'',
      views:0,
      url:'',
      category_id:0
    },
    onSubmit:(video=>{
     axios.post(`${BACKEND_URL}/add-video`,video)
     .then(()=>{
      console.log('Added video')
     });
     alert("Video Added Successfully")
     navigate('/admin-dashboard')
    })
  })

  useEffect(()=>{
   axios.get(`${BACKEND_URL}/get-categories`)
   .then(response=>{
     response.data.unshift({category_id:-1,category_name:'Select Category'})
    setCategories(response.data)
   })
  },[])
  return(
    <div className='p-4 bg-dark text-white m-3 rounded-3 fs-5' style={{maxWidth:'600px'}}> 
     <div >
      <h2 className='text-center mb-4'>Add Video</h2>
      <form onSubmit={formik.handleSubmit}>
        <dl className='row'>
        <dt className='col-4'>Video Id</dt>
        <dd className='col-8'><input required className='form-control ' type="number" name='video_id' onChange={formik.handleChange} /></dd>
        <dt className='col-4'>Title</dt>
        <dd  className='col-8'><input required className='form-control' type="text" name='title' onChange={formik.handleChange} /></dd>
        <dt  className='col-4'>Description</dt>
        <dd  className='col-8'><input className='form-control ' type="text" name='description' onChange={formik.handleChange}/></dd>
        <dt  className='col-4'>Comments</dt>
        <dd  className='col-8'><input className='form-control ' type="text"name='comments' onChange={formik.handleChange} /></dd>
        <dt  className='col-4'>Likes</dt>
        <dd  className='col-8'><input className='form-control' type="number"  name='likes' onChange={formik.handleChange}/></dd>
        <dt  className='col-4'>Views</dt>
        <dd  className='col-8'><input className='form-control ' type="number"name='views' onChange={formik.handleChange}/></dd>
        <dt  className='col-4'>Urls</dt>
        <dd  className='col-8'><input required className='form-control ' type="text"  name='url' onChange={formik.handleChange}/></dd>
        <dt  className='col-4'>Category </dt>
        <dd className='col-8 '>
           <select name='category_id' className='form-select' onChange={formik.handleChange}>
             {
              categories?.map(category=>
              <option  key={category.category_id} value={category.category_id}>{category.category_name}</option>)
             }
           </select>
        </dd>
        </dl>
        <button className='btn btn-primary mx-2'>Add Video</button>
        <Link to="/admin-dashboard" className='btn btn-danger '>Cancel</Link>
      </form>
    </div>
    </div>
  )
}