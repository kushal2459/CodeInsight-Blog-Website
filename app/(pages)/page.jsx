"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const POSTS_PER_PAGE = 5;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from API
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  // Filtered posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Total posts after filtering
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Paginate the filtered posts
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>Home | Blog</title>
        <meta name="description" content="List of blog posts" />
      </Head>

      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Blog Posts</h1>
        <p className="text-lg text-gray-500">
          Explore a collection of insightful blog posts.
        </p>
      </header>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full p-4 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <svg
          className="absolute left-4 top-4 h-6 w-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM21 21l-5.2-5.2"
          />
        </svg>
      </div>

      {/* Display Paginated Posts */}
      <ul className="space-y-6 max-w-3xl mx-auto">
        {paginatedPosts.map((post) => (
          <li
            key={post.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-2xl font-semibold text-blue-600 hover:underline mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 mb-4">By User {post.userId} on 2024-10-24</p>
            <p className="text-gray-700">{post.body.slice(0, 150)}...</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange("prev")}
          className={`px-4 py-2 rounded-lg text-lg transition-colors focus:outline-none ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={currentPage === 1}
        >
          &lt; Previous
        </button>

        <span className="text-lg font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange("next")}
          className={`px-4 py-2 rounded-lg text-lg transition-colors focus:outline-none ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}
