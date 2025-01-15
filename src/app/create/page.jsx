'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreatePage() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      router.push('/');
    } catch (error) {
      setError('Failed to create a post', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='m-8'>
      <h2>Create a New Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Body</label>
          <input 
            type="text" 
            name='body'
            value={formData.body}
            onChange={handleChange}
            className='border border-gray-300 rounded-md p-2 w-full'
            required
          />
        </div>
        <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg mt-4'>{loading ? 'Creating...' : 'Create Post'}</button>
      </form>
    </div>
  );
}
