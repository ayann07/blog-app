import Header from './components/Header';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Blogs from './pages/Blogs';
import Register from './pages/Register';
import Login from './pages/Login';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <BrowserRouter >
    <Header/>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/my-blogs' element={<UserBlogs/>}/>
      <Route path='/create-blog' element={<CreateBlog/>}/>
      <Route path='/blog-details/:id' element={<BlogDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable style={{marginTop:"2rem"}} />
    </BrowserRouter>
  );
}

export default App;
