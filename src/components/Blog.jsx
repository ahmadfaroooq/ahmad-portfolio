import { useEffect, useState } from "react";
import ghost from "../lib/ghost";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    ghost.posts
      .browse({ limit: 5 })
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>My Blog</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}

export default Blog;

