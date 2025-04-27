import React from "react";

const AboutUs = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('https://www.tastingtable.com/img/gallery/20-cake-hacks-to-craft-perfect-confections-every-time/intro-1690997736.jpg')`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-xl max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to E-LearnXpert</h1>
        <p className="text-lg">
        E-LearnXpert, we empower learners and educators through innovative, easy-to-use online learning solutions. Our platform offers high-quality Learning Platform, expert-led training, and interactive tools designed to make education more accessible, engaging, and effective for everyone. Whether you're a student, teacher, or lifelong learner, E-LearnXpert is your trusted partner on the path to knowledge and success.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
