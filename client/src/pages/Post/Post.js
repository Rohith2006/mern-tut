import React, { useState } from 'react';
import './Post.css';

function Post() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  async function registerUser(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:1337/product/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, image, description, price }),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="Post">
      <h1>Post</h1>
      <form onSubmit={registerUser}>
        <label>
          Title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            name="image"
          />
        </label>
        <br />
        <label>
          Description:
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
          />
        </label>
        <br />
        <label>
          Price:
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            name="price"
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <br />
      <button>
        <a href="/">Home</a>
      </button>
    </div>
  );
}

export default Post;
