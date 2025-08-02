
import {BrowserRouter, Route, Routes ,Link} from 'react-router-dom'
import { VideoLibraryHome } from './components/video-library-home'
import { UserRegister } from './components/user-register'
import { UserDashboard } from './components/user-dashboard'
import { UserLogin } from './components/user-login'
import { UserLoginError } from './components/user-login-error'
import { AdminLogin } from './components/admin-login'
import { AdminDashboard } from './components/admin-dashboard'
import { AddVideo } from './components/add-video'
import { EditVideo } from './components/edit-video'
import { DeleteVideo } from './components/delete-video'
import './App.css'

function App() {
 

  return (
    <div>
      <BrowserRouter>
       <Link to={'/'} className='text-decoration-none'><header className='bg-primary p-3 text-center position-sticky top-0 z-1'>
          <h1 className='  p-2 text-white fw-bold text-decoration-none bi bi-person-video font-manage'> Online Video Application</h1>
       </header></Link>
       <section>
           <Routes>
              <Route path="/" element={<VideoLibraryHome/>} />
              <Route path='user-login' element={<UserLogin/>}/>
              <Route path='user-register'element={<UserRegister/>}/>
              <Route path='user-dashboard' element={<UserDashboard/>}/>
              <Route path='user-login-error' element={<UserLoginError/>}/>
              <Route path='admin-login' element={<AdminLogin/>}/>
              <Route path='admin-dashboard' element={<AdminDashboard/>}/>
              <Route path='add-video' element={<AddVideo/>}/>
              <Route path='edit-video/:id' element={<EditVideo/>}/>
              <Route path='delete-video/:id' element={<DeleteVideo/>}/>
           </Routes>
       </section>
      </BrowserRouter>
    
    </div>
  )
}

export default App
