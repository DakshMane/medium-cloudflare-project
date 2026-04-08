import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from "./pages/Blog"
import Blogs from './pages/Blogs'
import  PublishBlog from './pages/PublishBlog'
import Home from './pages/Home'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/publish' element={<PublishBlog/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
