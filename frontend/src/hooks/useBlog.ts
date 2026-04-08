// src/hooks/useBlog.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { cacheGet, cacheSet } from '../cache/blogCache';

export const useBlog = (blogId: string | undefined) => {
  const cacheKey = `blog_${blogId}`;
  const [blog, setBlog] = useState<any>(() => cacheGet(cacheKey));
  const [loading, setLoading] = useState(!cacheGet(cacheKey)); // skip loading if cached

  useEffect(() => {
    if (!blogId) return;

    const cached = cacheGet<any>(cacheKey);
    if (cached) {
      setBlog(cached);
      setLoading(false);
      return; // ✅ skip fetch entirely
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        setBlog(res.data.blog);
        cacheSet(cacheKey, res.data.blog); // 💾 store in cache
      })
      .catch(() => alert('Failed to fetch blog.'))
      .finally(() => setLoading(false));
  }, [blogId]);

  return { blog, loading };
};
