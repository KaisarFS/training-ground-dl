"use client"; 

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function EditPage({ params: paramsPromise }) {
  // const { id } = params;
  const params = use(paramsPromise)
  const { id } = params
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setLoading(true)
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, formData)
      router.push('/');
    } catch (error) {
      console.error(error);
      setError('Failed to update post', error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchPost = async () => {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
          console.log(response, "<=== response fetch post edit")
        }
        // setFormData({
        //   title: response.data.title,
        //   body: 
        // })
      } catch (error) {
        console.error(error);
        setError('Failed to fetch post', error);
      }
    }

    fetchPost();
  }, [id])

  if(loading) {
    return <p>LOADING...</p>
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className="p-8">
      <h1>Edit Post {id}</h1>
      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <label>Body</label>
          <input
            type="text"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>

        <button type='submit '>Submit</button>
      </form>
    </div>
  );
}
