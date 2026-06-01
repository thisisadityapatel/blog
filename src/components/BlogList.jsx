import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadBlogMetadata } from "../utils/blogLoader";
import "./BlogList.css";

function isPublishedWithinMonth(dateObj) {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return dateObj >= oneMonthAgo;
}

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      // Only load metadata (title, date, slug) - not full content
      const blogPosts = await loadBlogMetadata();
      setPosts(blogPosts);
    }
    fetchPosts();
  }, []);

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.slug} className="blog-item">
          <Link to={`/${post.slug}`} className="blog-title">
            {isPublishedWithinMonth(post.dateObj) && (
              <span className="dot-ripple"> ● </span>
            )}
            {post.title}
          </Link>
          <span className="blog-meta">
            <span className="blog-date">{post.date}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
