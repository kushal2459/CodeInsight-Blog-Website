"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto md:px-10 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          CodeInsight Blog
        </Link>

        <button
          className="block lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>

        <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} lg:items-center`}>
          <div className="lg:flex lg:space-x-4">
            <Link href="/about" className="block lg:inline-block mt-4 lg:mt-0 mr-4">
              About
            </Link>
            <Link href="/contact" className="block lg:inline-block mt-4 lg:mt-0">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
