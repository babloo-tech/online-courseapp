import {BACKEND_URL} from '../utils/utils'
import axios from 'axios'
import {useFormik} from 'formik'
import {Link, useNavigate} from "react-router-dom"
import { useCookies } from 'react-cookie'
export function UserLogin(){

  let navigate=useNavigate()
  const [cookie,setCookie, removeCookie]=useCookies(['userid'])

  const formik=useFormik({
       initialValues:{
        user_id:"",
        password:""
       },
      onSubmit:(user)=>{
        axios.get(`${BACKEND_URL}/get-users`)
        .then(response=>{
          let result=response.data.find((item:any)=>item.user_id===user.user_id)
          
           if(result){
             if(result.password===user.password){
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

  return(
    <div>
       <form className='p-4 bg-white text-dark ms-3 rounded mt-4' onSubmit={formik.handleSubmit} style={{width:'250px'}}>
            <dl >
            <h2 className='bi bi-person-fill'>User Login</h2>
              <dt>User Id</dt>  
              <dd><input type="text" className='form-control'  name='user_id' onChange={formik.handleChange} /></dd>
              <dt>Password</dt>
              <dd><input type="password" className='form-control' name='password' onChange={formik.handleChange} /></dd>
            </dl>
            <button type='submit' className="btn btn-primary">Login</button>
      
       <div className="mt-2 ">
         <Link to="/user-register" className="text-decoration-none mt-3">Create New Account</Link>   
       </div>
       </form>
    </div>
  )
}