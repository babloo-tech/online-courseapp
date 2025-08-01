import {Link} from 'react-router-dom'
export function UserLoginError(){

  return(
    <div>
        <h2 className='text-danger'>User Does't Exist</h2>
        <Link to="/user-login">Please try again</Link>
    </div>
  )
}