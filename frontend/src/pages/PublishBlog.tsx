import React, { useEffect, useState } from 'react';
import AppBar from '../components/AppBar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import {  useNavigate } from 'react-router-dom';

// ✅ Moved outside component
interface Post {
  title: string;
  content: string;
}



const PublishBlog = () => {
  const navigate = useNavigate();

  const [user , setUser] = useState("")

  async function fetchUser() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    setUser(response.data.user.name)
  }

  useEffect(() => {
    fetchUser()
  },[])

  // ✅ Initialized with default values to avoid uncontrolled input warning
  const [post, setPost] = useState<Post>({ title: '', content: '' });

  // ✅ Moved submitPost outside TextEditor, directly in PublishBlog
  async function submitPost(e: React.FormEvent) {
    e.preventDefault();

    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,post , {headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}});


    if (response.status === 201) {
      alert('Blog published successfully');
      setPost({ title: '', content: '' });
      navigate('/blogs');
    } else {
      alert('Failed to publish blog. Please try again later.');
    }
  }

  return (
    <div>
      <AppBar author={user} />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-lg w-full">
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />
          <div className="pt-4">
            {/* ✅ Removed nested TextEditor component — inlined the form here */}
            <form onSubmit={submitPost}>
              <div className="w-full mb-4 border border-gray-400 rounded-base shadow-xs rounded-2xl">
                <label className="sr-only">Publish post</label>
                <textarea
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  value={post.content}

                  rows={8}
                  cols={8}
                  className="block w-full px-0 text-sm text-heading focus:ring-blue-500 border-0 placeholder:text-body"
                  required
                ></textarea>

              </div>
              <button
                type="submit"
                className="text-white bg-brand box-border border  focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none bg-blue-600 rounded-2xl"
              >
                Publish post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishBlog;
