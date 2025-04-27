import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';


const PostMediaSlider = ({ mediaUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mediaUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mediaUrls.length - 1 : prevIndex - 1
    );
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <div className="relative w-full h-full">
      {mediaUrls.map((url, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-300 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {isVideo(url) ? (
            <video 
              src={url}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <img 
              src={url}
              alt={`Post media ${index + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      ))}

      {mediaUrls.length > 1 && (
        <>
          {}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {mediaUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to media ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostMediaSlider;