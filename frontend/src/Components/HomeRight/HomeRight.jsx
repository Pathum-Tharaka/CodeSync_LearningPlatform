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
    <div className="space-y-6">
      {/* Featured Profiles Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Featured Profiles</h2>
        <div className="space-y-5">
          {dummyProfiles.map((profile, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {/* Profile Info */}
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                  src={profile.image}
                  alt={profile.name}
                />
                <div>
                  <p className="font-semibold text-sm">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                  <p className="text-xs text-gray-400">{profile.description}</p>
                </div>
              </div>

              {/* Follow Button */}
              <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-xl font-bold mb-2">Upgrade to Premium</h2>
        <p className="text-sm mb-4 opacity-90">
          Get unlimited access to premium content and features.
        </p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm">
          Try for 30 Days Free
        </button>
      </div>
    </div>
  );
};

export default HomeRight;
