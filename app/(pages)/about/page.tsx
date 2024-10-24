import Head from 'next/head';

export default function About() {
  return (
    <>  
      <Head>
        <title>About | My Blog</title>
        <meta name="description" content="Learn more about My Blog and its mission." />
      </Head>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4 text-center">About My Blog</h1>
        
        {/* Mission Statement */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="mb-4">
            Welcome to My Blog! Our platform is dedicated to sharing insightful articles,
            tutorials, and stories that inspire and educate our readers. We aim to create
            a community of enthusiastic learners who are passionate about exploring new
            ideas and sharing knowledge.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold">John Doe</h3>
              <p className="text-gray-600">Editor-in-Chief</p>
              <p className="mt-2">
                John is a passionate writer with a love for technology and storytelling. He believes in the power of words to inspire change.
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold">Jane Smith</h3>
              <p className="text-gray-600">Content Strategist</p>
              <p className="mt-2">
                Jane focuses on creating engaging content that resonates with our audience. Her experience in marketing helps us reach more readers.
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold">Alice Johnson</h3>
              <p className="text-gray-600">Community Manager</p>
              <p className="mt-2">
                Alice is dedicated to building our community. She loves connecting with readers and ensuring their voices are heard.
              </p>
            </div>
          </div>
        </section>

        {/* Community Involvement Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Community Involvement</h2>
          <p className="mb-4">
            At My Blog, we believe in giving back to our community. We regularly host events, workshops, and webinars to engage with our readers.
            Our goal is to foster a sense of belonging and collaboration among our audience.
          </p>
          <p>
            Stay tuned for upcoming events where you can learn, share, and connect with like-minded individuals!
          </p>
        </section>

        {/* Call to Action */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Join Us!</h2>
          <p className="mb-4">
            We believe that everyone has a story to tell, and we strive to provide a space where voices can be heard.
            Thank you for being a part of our journey! If you'd like to contribute or collaborate, feel free to reach out!
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Contact Us
          </a>
        </section>
      </div>
    </>
  );
}
