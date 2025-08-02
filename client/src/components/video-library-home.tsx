
import {Link} from 'react-router-dom'
export function VideoLibraryHome(){
   
  return(
    <div className="d-flex justify-content-center align-items-center  fixed-top" style={{minHeight:'627px',marginTop:'150px'}}>
      <div className='border 1px solid p-4 py-5 rounded-4 ' style={{backgroundColor:'rgba(36, 36, 141, 0.8)',boxShadow:'4px 4px 40px 5px rgba(210, 29, 147, 0.8) '}}>
          
           <div><Link to="/user-login" style={{width:'200px'}} className='btn btn-warning  btn-lg my-4'> <span className='bi bi-person-fill'></span> User Login</Link></div>
           <div><Link to="/admin-login" style={{width:'200px'}} className='btn btn-danger  btn-lg mb-4'><span className='bi bi-lock-fill'></span> Admin Login</Link></div>
           <div><Link to="/user-register" style={{width:'200px'}} className='btn btn-lg btn-info'><span className='bi bi-person-fill'></span> New User?</Link> </div>
      </div>
    </div>
  )
}