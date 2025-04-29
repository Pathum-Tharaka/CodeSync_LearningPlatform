import React from 'react';

const SuggestionsUserCard = ({ image, username, description }) => {
  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-100 transition rounded-lg cursor-pointer">
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full object-cover" src={image} alt="user" />
        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-800">{username}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full font-medium transition">
        Follow
      </button>
    </div>
  );
};

export default SuggestionsUserCard;
