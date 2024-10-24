"use client";
import { useParams } from 'next/navigation';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Post() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [editingComment, setEditingComment] = useState(null); 

  useEffect(() => {
    if (id) {
      async function fetchPost() {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await res.json();
        setPost(data);
        setLoading(false);
      }
      fetchPost();
    }
  }, [id]);

  // Dummy initial comments
  useEffect(() => {
    setComments([
      { id: 1, name: 'John Doe', text: 'This is a great post!' },
      { id: 2, name: 'Jane Smith', text: 'I learned a lot from this.' }
    ]);
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.text) {
      if (editingComment) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editingComment.id ? { ...comment, ...newComment } : comment
          )
        );
        setEditingComment(null);
      } else {
        setComments((prevComments) => [
          ...prevComments,
          { id: Date.now(), name: newComment.name, text: newComment.text },
        ]);
      }
      setNewComment({ name: '', text: '' });
    }
  };

  const handleDeleteComment = (id) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setNewComment({ name: comment.name, text: comment.text });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={`Read the blog post titled "${post.title}"`} />
      </Head>

      <div className="container mx-auto p-6">
        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-6 text-sm">By User {post.userId} on 2024-10-24</p>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>{post.body}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold mb-4">Comments</h2>

          {/* List of Comments */}
          <ul className="space-y-4 mb-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li
                  key={comment.id}
                  className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{comment.name}</h4>
                    <p className="text-gray-600">{comment.text}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEditComment(comment)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No comments yet. Be the first to comment!</p>
            )}
          </ul>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-gray-700 font-semibold">
                Comment
              </label>
              <textarea
                id="comment"
                rows="4"
                value={newComment.text}
                onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comment here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
            >
              {editingComment ? "Update Comment" : "Submit Comment"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
