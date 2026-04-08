import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import AppBar from '../components/AppBar';
import { AvatarIcon } from '../components/BlogCard';
import { useBlog } from '../hooks/useBlog';
import BlogPageSkeleton from '../components/BlogSkeleton';

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Blog = () => {
  const [authorName , setAuthorName] = useState("")



  const blogId = useParams().id;
  const { blog, loading } = useBlog(blogId);

  const fetchAuthor = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile` , {headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}}) ;
    setAuthorName(response.data.name) ;
  }




  useEffect(() => {
    fetchAuthor() ;
  } , [])
  return (
    <div>
      <AppBar author={authorName || 'User'} />

     {loading ? <BlogPageSkeleton/> : <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full  pt-2 max-w-7xl">
          <div className=" col-span-8">
            <div className="text-5xl font-extrabold">{blog?.title}</div>
            <div className=" pt-2 text-slate-400"> Post on {formatDate(blog?.publishedDate)}</div>
            <div className="font-thin">{blog?.content}</div>
          </div>
          <div className="col-span-4">
            Author
            <div className="flex pt-2 items-center gap-4">
              <div><AvatarIcon name={blog?.author.name || 'User'} /></div>
              <div className="text-2xl font-bold">{blog?.author.name}</div>
            </div>
            <div className="text-slate-500">Random catch phrase about the author </div>
          </div>
        </div>
      </div>
  }
  </div>
  );
}

export default Blog
