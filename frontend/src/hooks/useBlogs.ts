// src/hooks/useBlogs.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { cacheGet, cacheSet } from '../cache/blogCache';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>(() => cacheGet('blogs') ?? []);
  const [loading, setLoading] = useState(!cacheGet('blogs')); // skip loading if cached

  useEffect(() => {
    const cached = cacheGet<any[]>('blogs');
    if (cached) {
      setBlogs(cached);
      setLoading(false);
      return; // ✅ skip fetch entirely
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        cacheSet('blogs', res.data.blogs); // 💾 store in cache
      })
      .catch(() => alert('Failed to fetch blogs.'))
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
};
