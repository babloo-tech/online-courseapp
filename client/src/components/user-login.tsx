import {BACKEND_URL} from '../utils/utils'
import axios from 'axios'
import {useFormik} from 'formik'
import {Link, useNavigate} from "react-router-dom"
import { useCookies } from 'react-cookie'
export function UserLogin(){

  let navigate=useNavigate()
  const [,setCookie,]=useCookies(['userid'])

  const formik=useFormik({
       initialValues:{
        user_id:"",
        password:""
       },
      onSubmit:(user)=>{
        axios.get(`${BACKEND_URL}/get-users`)
        .then(response=>{
          let result=response.data.find((item:any)=>item.user_id===user.user_id.trim())
          
           if(result){
             if(result.password===user.password.trim()){
               setCookie('userid',user.user_id)
                navigate('/user-dashboard')
             }
             else{
               alert("Invalid password")
             }
           }
           else{
             navigate('/user-login-error')
           }
        })
      }
    })

    function handleCancel(){
      navigate('/')
    }

  return(
    <div className='d-flex justify-content-center  mx-4 '>
       <form className='p-4 bg-white text-dark ms-3 rounded mt-4' onSubmit={formik.handleSubmit} style={{width:'300px'}}>
         <button type="button" onClick={handleCancel} className="btn-close float-end btn btn-danger p-2" data-bs-dismiss="modal"></button>
            <dl >
            <h2 className='bi bi-person-fill'>User Login</h2>
              <dt>User Id</dt>  
              <dd><input  required type="text" autoFocus className='form-control' placeholder='enter id'  name='user_id' onChange={formik.handleChange} /></dd>
              <dt>Password</dt>
              <dd><input  required type="password" placeholder='enter password' className='form-control' name='password' onChange={formik.handleChange} /></dd>
            </dl>
            <button type='submit' className="btn btn-primary">Login</button>
      
       <div className="mt-2 ">
         <Link to="/user-register" className="text-decoration-none mt-3">Create New Account</Link>   
       </div>
       </form>
    </div>
  )
}