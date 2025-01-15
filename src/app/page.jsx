'use client';

import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data.slice(0, 10));
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
    } catch (error) {
      setError('Failed to delete a post', error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">List Posts</h2>
      <ul className='space-y-4'>
        {posts.map((post, index) => (
          <li key={post.id} className='p-4 border rounded shadow'>
            <h3> {index + 1}. {post.title}</h3>
            <p>{post.body}</p>

            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}