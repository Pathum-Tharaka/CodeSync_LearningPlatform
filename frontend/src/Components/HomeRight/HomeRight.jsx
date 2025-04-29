import React from "react";
import { BsDot } from "react-icons/bs";

const dummyProfiles = [
  {
    name: "Dr. Jane Foster",
    role: "Astrophysicist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Expert in research at NASA",
  },
  {
    name: "Prof. Alan Turing",
    role: "Computer Scientist",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    description: "Pioneer in AI and cryptography",
  },
  {
    name: "Dr. Marie Curie",
    role: "Physicist & Chemist",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    description: "Discovered polonium and radium",
  },
];

const HomeRight = () => {
  return (
    <div className="p-3 bg-white shadow-md rounded-lg w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Featured Profiles</h2>

      <div className="space-y-5">
        {dummyProfiles.map((profile, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
          >
            {/* Profile Info */}
            <div className="flex items-center gap-2">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={profile.image}
                alt={profile.name}
              />
              <div>
                <p className="font-semibold">{profile.name}</p>
                <p className="text-sm text-gray-500">{profile.role}</p>
                <p className="text-xs text-gray-400">{profile.description}</p>
              </div>
            </div>

            {/* Follow Button */}
            <button className="text-blue-600 text-sm font-semibold hover:underline ml-6">
              {" "}
              Follow
            </button>
          </div>
        ))}
      </div>
      {/* Buy Premium Card */}
      <div className="border rounded-lg p-4 mt-6 text-center bg-blue-50 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Buy Premium</h2>
        <p className="text-sm text-gray-600 mb-4">
          Get unlimited access to premium content and features.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
          Try for 30 Days Free
        </button>
      </div>

      {/* About Us Section */}
      <div className="border-t pt-6 text-xs text-gray-600 leading-6">
        <p className="font-semibold text-sm mb-3 text-black">About Us</p>
        <p>
          Our platform connects learners with top scientists, researchers, and
          professionals worldwide. Join our network and explore cutting-edge
          knowledge.
        </p>

        <div className="mt-2 space-y-1">
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:info@codesync.com"
              className="text-blue-500 hover:underline"
            >
              info@codesync.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            <a href="tel:+9434567890" className="text-blue-500 hover:underline">
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
