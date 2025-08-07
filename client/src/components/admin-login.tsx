import {BACKEND_URL} from '../utils/utils'
import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
export function AdminLogin(){

  const navigate=useNavigate()
  const formik=useFormik({
    initialValues:{
      admin_id:"",
      password:""
    },
     onSubmit:(admin:any)=>{
       axios.get(`${BACKEND_URL}/get-admin`)
       .then(response=>{
        let result=response.data.find((item:any)=>item.admin_id===admin.admin_id)
        if(result){
          if(result.password===admin.password){
             navigate('/admin-dashboard')
          }else{
            alert('Invalid Password')
          }
        }else{
          alert("Admin does't Exist")
        }
       })
     }
     })

     function handleCancel(){
      navigate('/')
     }

  return(
    <div className='d-flex justify-content-center  mx-4 '>
      
       <form onSubmit={formik.handleSubmit} className="bg-warning ms-3 p-4 text-black mt-4 rounded" style={{width:'320px'}}>
         <button type="button" onClick={handleCancel} className="btn-close float-end btn btn-danger p-2" data-bs-dismiss="modal"></button>
        <dl>
        <h2 className="bi bi-person-fill">Admin Login</h2>
          <dt>User Id</dt>
          <dd><input required type="text" className="form-control" onChange={formik.handleChange} name="admin_id" /></dd>
          <dt>Password</dt>
          <dd><input required type="password" className="form-control" onChange={formik.handleChange} name="password" /></dd>
        </dl>
        <button type="submit" className="btn btn-primary">Login</button>
       </form>
    </div>
  )
}