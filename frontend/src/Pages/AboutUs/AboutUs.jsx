import React from "react";

const AboutUs = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://www.tastingtable.com/img/gallery/20-cake-hacks-to-craft-perfect-confections-every-time/intro-1690997736.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Main Content */}
      <div className="z-10 max-w-4xl text-white px-6 py-10 rounded-xl text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to CodeSync</h1>
        <p className="text-lg leading-relaxed mb-6">
          At <span className="text-blue-300 font-semibold">CodeSync</span>, we empower learners and developers through
          innovative, easy-to-use online learning solutions. Our platform offers high-quality content, expert-led training,
          and interactive tools designed to make education more accessible, engaging, and effective.
        </p>
        <p className="text-lg leading-relaxed mb-8">
          Whether you're a student, teacher, or lifelong learner, <span className="text-yellow-300 font-semibold">CodeSync </span>
          is your trusted partner on the path to knowledge and success. Join our community and start your learning journey today!
        </p>

        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200"
        >
          Explore knowledge
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
