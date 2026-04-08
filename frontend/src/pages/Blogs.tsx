import axios from 'axios'
import  { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import BlogCard from '../components/BlogCard';
import AppBar from '../components/AppBar';
import BlogSkeleton from '../components/BlogsSkeleton';
import { useBlogs } from '../hooks/useBlogs';

const Blogs = () => {

  const [authorName , setAuthorName] = useState("") ;
  const {blogs , loading} = useBlogs() ;

 const fetchAuthor = async () => {
   const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
   });
   console.log(response.data.user.name)
   setAuthorName(response.data.user.name);
   console.log(authorName)
 };


useEffect(() => {


    fetchAuthor()  ;
} , [])

  return (
    <div>
      <AppBar author={authorName} />

      {loading ? (
        <div className='flex justify-center'>
          <div className='flex flex-col max-w-4xl w-full'>
            {[...Array(5)].map((_,i) => <BlogSkeleton key={i} /> )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className=" flex flex-col justify-center max-w-3xl w-full ">
            {blogs
              .filter((blog: any) => blog.author?.name)
              .map((blog: any) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  author={blog.author}
                  title={blog.title}
                  content={blog.content}
                  publishedAt={blog?.publishedDate}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs
