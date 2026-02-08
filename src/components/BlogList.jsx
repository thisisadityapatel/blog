import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadBlogPosts } from '../utils/blogLoader';
import './BlogList.css';

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const blogPosts = await loadBlogPosts();
      setPosts(blogPosts);
    }
    fetchPosts();
  }, []);

  return (
    <div className="blog-list">
      {posts.map(post => (
        <div key={post.slug} className="blog-item">
          <Link to={`/${post.slug}`} className="blog-title">
            {post.title}
          </Link>
          <span className="blog-date">{post.date}</span>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
