import './App.css';
import { Routes ,Route, useNavigate} from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import About from './Pages/About';
import Navbar from './components/common/Navbar';
import ForgotPassword from './Pages/ForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyEmail from './Pages/VerifyEmail';
import Footerfoot from './components/common/Footer';
import Contact from './Pages/Contact';
import ReviewSlider from './components/common/ReviewSlider';
import Dashboard from './Pages/Dashboard';
import Myprofile from './components/core/Dashboard/Myprofile';
import Settings from './components/core/Dashboard/Settings/Settings';
import Team from './components/common/Team';
import Enrolledcourses from './components/core/Dashboard/Enrolledcourses';
import Index from './components/core/Dashboard/Cart';
import MyCourses from './components/core/Dashboard/MyCourses';
import Indexcourse from './components/core/Dashboard/Addcourse';
import SubSectionModal from './components/core/Dashboard/Addcourse/courseBuilder/subSectionModal';
import Catalog from './Pages/Catalog';
import CourseDetails from './Pages/CourseDetails';
import OpenRoute from './components/core/Auth/OpenRoute';
import ViewCourse from './Pages/ViewCourse';
import Videodetailssidebar from './components/core/Dashboard/ViewCourse/Videodetailssidebar';
import VideoDetails from './components/core/Dashboard/ViewCourse/VideoDetails';
import Instructor from './components/core/Dashboard/InstructoDashboard/Instructor';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import { ACCOUNT_TYPE } from './utils/constants';
import Error from './Pages/Error';
import { useEffect } from 'react';


function App() {
  const {user} = useSelector((state)=>state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {                                            
            // it store data of user in localstroage and when we open browser then that user logined;                 
    if(localStorage.getItem("token")){
      const token = JSON.parse(localStorage.getItem("token"))
    //  dispatch(getUserDetails(token, navigate))
    }
  }, [])
  return (
    <div className='font-family-inter flex flex-col bg-richblack-900 mx-auto object-contain w-full h-full '>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/SignUp" element = {<OpenRoute><SignUp/></OpenRoute>}/>
        <Route path="/Login" element = {<OpenRoute><Login/></OpenRoute>}/>
        <Route path="/About" element = {<OpenRoute><About/></OpenRoute>}/>
        <Route path="/contact" element = {<OpenRoute><Contact/></OpenRoute>}/>
        <Route path ="/team" element = {<Team/>}/>
        <Route path = "/forgot-password" element = {<OpenRoute><ForgotPassword/></OpenRoute>}/>
        <Route path = "/Update-Password/:id" element = {<OpenRoute><UpdatePassword/></OpenRoute>}/>
        <Route path = "/verifyEmail" element = {<OpenRoute><VerifyEmail/></OpenRoute>}/>
        <Route path = "/catalog/:catalogName" element = {<OpenRoute><Catalog/></OpenRoute>}/>
        <Route path = "/subsectionmodal" element = {<OpenRoute><SubSectionModal/></OpenRoute>}/>
        <Route path="/courses/:id" element = {<OpenRoute><CourseDetails/></OpenRoute>}/>
        <Route path = "*" element={<Error/>}/>
      <Route path = "/dashboard" element = {<PrivateRoute><Dashboard/></PrivateRoute>}>
        {
          user?.accountType ===ACCOUNT_TYPE.INSTRUCTOR && 
          <>
        <Route path ="/dashboard/add-course" element = {<Indexcourse/>}/>
        <Route path ="/dashboard/edit-course" element = {<Indexcourse/>}/>
         <Route path ="/dashboard/my-courses" element = {<MyCourses/>}/>
         <Route path ="/dashboard/instructor" element = {<Instructor/>}/>
          </>
        }
        {
          user?.accountType ===ACCOUNT_TYPE.STUDENT && 
          <>
        <Route path ="/dashboard/enrolled-courses" element = {<Enrolledcourses/>}/>
        <Route path ="/dashboard/cart" element = {<Index/>}/>
        <Route path ="/dashboard/purchase-history" element = {<MyCourses/>}/>
          </>
        }
        <Route path = "/dashboard/my-profile" element= {<Myprofile/>}/>
        <Route path = "/dashboard/settings" element= {<Settings/>}/>
        </Route>
    
      <Route element = {<PrivateRoute><ViewCourse/></PrivateRoute>}>
        {
          user?.accountType===ACCOUNT_TYPE.STUDENT && <Route path = "/view-course/:courseId/section/:sectionId/sub-section/:subsectionId" element = {<VideoDetails/>}/>
        }
       </Route>
      </Routes>
    </div>
  );
}

export default App;
