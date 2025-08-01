import {BACKEND_URL} from '../utils/utils'
import axios from 'axios'
import {useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import * as yup from 'yup'
export function UserRegister(){

const navigate=useNavigate()
const[userMsg,setUserMsg]=useState('')
const[color,setColor]=useState('')

 const formik=useFormik({
    initialValues:{
      user_id:"",
      user_name:"",
      password:"",
      email:"",
      mobile:""
    },
    onSubmit:(user)=>{
      axios.post(`${BACKEND_URL}/register-user`,user)
      .then(()=>{
        alert('Registered User....')
      })
       
      navigate('/user-login')
    },

    validationSchema:yup.object({      // defaut Validation

    })
    
 })

 function VerifyUser(e:any){              // Manual Validation
   axios.get(`${BACKEND_URL}/get-users`)
   .then(response=>{

    for(var user of response.data){
      if(user.user_id===e.target.value){
        setUserMsg('User id Already Exists-try Another')
        setColor('text-danger')
        break;
      }
      else{
        setUserMsg('User Id Available..')
        setColor('text-success')
      }

    }
   })
 }

 function handleonBlur(){
  setUserMsg('')

 }
  return(
   <div>
       
       <form onSubmit={formik.handleSubmit} className='p-4 ms-3 mt-4 bg-white rounded-2 text-black' style={{width:'280px'}}>
        <dl >
        <h2 className='bi bi-person-fill'>User Register</h2>
          <dt>User Id</dt>
          <dd><input type="text"  className='form-control' onBlur={handleonBlur} onKeyUp={VerifyUser}  onChange={formik.handleChange}  name='user_id'/></dd>
          <dd className={color}>{userMsg}</dd>
          <dt>User Name</dt>
          <dd><input type="text"  className='form-control' onChange={formik.handleChange}  name='user_name'/></dd>
          <dt>Password</dt>
          <dd><input type="password"  className='form-control' onChange={formik.handleChange}  name='password'/></dd>
          <dt>Email</dt>
          <dd><input type="text"  className='form-control' onChange={formik.handleChange}  name='email'/></dd>
          <dt>Mobile</dt>
          <dd><input type="text"  className='form-control' onChange={formik.handleChange}  name='mobile'/></dd>
        </dl>
        <button className='btn btn-primary mb-2' >Register</button>
        <div>
          <Link to="/user-login" className='text-decoration-none '>Existing User?</Link>
        </div>
       </form>
    </div>
  )
}