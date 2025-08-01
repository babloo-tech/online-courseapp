
import {Link} from 'react-router-dom'
export function VideoLibraryHome(){
   
  return(
    <div className="d-flex justify-content-center align-items-center bg-set" style={{minHeight:'627px'}}>
      <div>
          <div>
          <Link to="/user-login" className='btn btn-warning center btn-lg'>User Login</Link>
          <Link to="/admin-login" className='btn btn-dark mx-2 btn-lg'>Admin Login</Link>
          </div>
          <div className='text-center mt-3'>
              <Link to="/user-register" className='btn btn-lg btn-primary'>New User?</Link>
          </div>
      </div>
    </div>
  )
}