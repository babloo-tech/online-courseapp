import {Link} from 'react-router-dom'
export function UserLoginError(){

  return(
    <div className='p-4'>
        <h2 className='text-danger'>User Does't Exist</h2>
        <Link to="/user-login" className='text-warning fs-5 text-decoration-none'><span className="bi bi-send-arrow-up btn btn-primary"></span> Please try again</Link>
    </div>
  )
}