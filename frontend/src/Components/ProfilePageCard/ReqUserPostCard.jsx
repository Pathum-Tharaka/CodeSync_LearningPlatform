import React, { useState } from 'react';
import "./ReqUserPostCard.css";
import {AiFillHeart} from "react-icons/ai";
import {FaComment} from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from "@chakra-ui/react";

const ReqUserPostCard = ({post}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNextMedia = (e) => {
    e.stopPropagation();
    setCurrentMediaIndex(prev => 
      prev === post.mediaUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevMedia = (e) => {
    e.stopPropagation();
    setCurrentMediaIndex(prev => 
      prev === 0 ? post.mediaUrls.length - 1 : prev - 1
    );
  };

  const handlePostClick = () => {
    onOpen();
  };

  return (
    <>
      <div 
        className='post relative w-full h-full'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePostClick}
      >
        {post?.mediaUrls ? (
          <>
            {post.mediaTypes?.[currentMediaIndex] === "video" ? (
              <video 
                className='w-full h-full object-cover'
                src={post.mediaUrls[currentMediaIndex]}
                controls
              />
            ) : (
              <img 
                className='w-full h-full object-cover' 
                src={post.mediaUrls[currentMediaIndex]} 
                alt="" 
              />
            )}

            {post.mediaUrls.length > 1 && isHovered && (
              <>
                <button
                  onClick={handlePrevMedia}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-1 z-10"
                  aria-label="Previous media"
                >
                  <ChevronLeftIcon boxSize={4} />
                </button>
                <button
                  onClick={handleNextMedia}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-1 z-10"
                  aria-label="Next media"
                >
                  <ChevronRightIcon boxSize={4} />
                </button>
              </>
            )}

            {/* Media type indicator */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
              {post.mediaTypes?.[currentMediaIndex] === "video" ? "Video" : "Photo"}
            </div>

            {/* Media count indicator */}
            {post.mediaUrls.length > 1 && (
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
                {currentMediaIndex + 1}/{post.mediaUrls.length}
              </div>
            )}

            {/* Dots for slide indicator */}
            {post.mediaUrls.length > 1 && (
              <div className="absolute bottom-2 w-full flex justify-center space-x-1 z-10">
                {post.mediaUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMediaIndex(index);
                    }}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentMediaIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    aria-label={`Go to media ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <img 
            className='w-full h-full object-cover' 
            src={post?.image} 
            alt="" 
          />
        )}
        <div className='overlay'>
          <div className='overlay-text flex justify-between'>
            <div className='flex items-center'><AiFillHeart className='mr-2'/> <span>{post?.likedByUsers?.length}</span></div>
            <div className='flex items-center'><FaComment className='mr-2'/> <span>{post?.comments?.length}</span></div>
          </div>
        </div>
      </div>

      {/* Modal for full post view */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent className="bg-white rounded-lg overflow-hidden">
          <ModalBody className="p-0">
            <div className="flex">
              {/* Media section */}
              <div className="w-3/4 relative">
                {post.mediaTypes?.[currentMediaIndex] === "video" ? (
                  <video 
                    className='w-full h-full object-contain'
                    src={post.mediaUrls[currentMediaIndex]}
                    controls
                    autoPlay
                  />
                ) : (
                  <img 
                    className='w-full h-full object-contain' 
                    src={post.mediaUrls[currentMediaIndex]} 
                    alt="" 
                  />
                )}

                {post.mediaUrls.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevMedia}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 z-10"
                      aria-label="Previous media"
                    >
                      <ChevronLeftIcon boxSize={6} />
                    </button>
                    <button
                      onClick={handleNextMedia}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 z-10"
                      aria-label="Next media"
                    >
                      <ChevronRightIcon boxSize={6} />
                    </button>
                  </>
                )}

                {/* Dots for slide indicator */}
                {post.mediaUrls.length > 1 && (
                  <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-10">
                    {post.mediaUrls.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentMediaIndex ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        aria-label={`Go to media ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Post details section */}
              <div className="w-1/4 border-l p-4">
                <div className="flex items-center mb-4">
                  <img 
                    src={post.user?.image} 
                    alt={post.user?.username} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-semibold">{post.user?.username}</span>
                </div>
                <p className="text-sm mb-4">{post.caption}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <AiFillHeart className="text-red-500 mr-1" />
                    <span>{post.likedByUsers?.length}</span>
                  </div>
                  <div className="flex items-center">
                    <FaComment className="text-gray-500 mr-1" />
                    <span>{post.comments?.length}</span>
                  </div>
                </div>
                {post.location && (
                  <div className="text-sm text-gray-500">
                    📍 {post.location}
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReqUserPostCard;