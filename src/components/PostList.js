import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostWithPhotos = () => {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsAndPhotos = async () => {
      try {
        // Fetch posts and photos simultaneously
        const [postsResponse, photosResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/photos')
        ]);

        setPosts(postsResponse.data.slice(0, 10)); // Limit to 10 posts
        setPhotos(photosResponse.data.slice(0, 10)); // Limit to 10 photos
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchPostsAndPhotos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Posts with Photos</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <img src={photos[index]?.thumbnailUrl} alt={photos[index]?.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostWithPhotos;
