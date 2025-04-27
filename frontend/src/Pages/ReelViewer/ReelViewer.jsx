import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getAllReels } from "../../Redux/Reel/Action";
import { IconButton, Avatar, Box, Text, Progress } from "@chakra-ui/react";
import { 
  BsFillPlayFill, 
  BsFillPauseFill,
  BsHeart,
  BsHeartFill,
  BsChat,
  BsShare,
  BsVolumeUp,
  BsVolumeMute
} from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

const ReelViewer = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef(null);
  
  const dispatch = useDispatch();
  const { user, reel } = useSelector((store) => store);
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getAllReels(jwt));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentReel]);

  const handleNextReel = () => {
    if (currentReel === reel.reels.length - 1) {
      setCurrentReel(0);
    } else {
      setCurrentReel(currentReel + 1);
    }
    setProgress(0);
  };

  const handlePrevReel = () => {
    if (currentReel === 0) {
      setCurrentReel(reel.reels.length - 1);
    } else {
      setCurrentReel(currentReel - 1);
    }
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleVideoEnd = () => {
    handleNextReel();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="reel-viewer min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div 
        className="relative reel-container w-[360px] h-[640px] bg-black rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Progress Bar */}
        <Progress
          value={progress}
          size="xs"
          colorScheme="pink"
          position="absolute"
          top="0"
          width="100%"
          zIndex="10"
        />

        {/* Video Player */}
        <video
          ref={videoRef}
          src={reel.reels[currentReel]?.video}
          className="w-full h-full object-cover"
          loop={false}
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onClick={togglePlay}
        />

        {/* Play/Pause Overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
            >
              <BsFillPlayFill className="text-white text-6xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <IconButton
            onClick={handlePrevReel}
            icon={<GrPrevious />}
            variant="ghost"
            colorScheme="whiteAlpha"
            className="text-white"
            aria-label="Previous reel"
          />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <IconButton
            onClick={handleNextReel}
            icon={<GrNext />}
            variant="ghost"
            colorScheme="whiteAlpha"
            className="text-white"
            aria-label="Next reel"
          />
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          {/* User Info */}
          <div className="flex items-center mb-4">
            <Avatar 
              size="sm" 
              src={reel.reels[currentReel]?.user?.avatar} 
              name={reel.reels[currentReel]?.user?.username}
            />
            <Text className="ml-2 text-white font-medium">
              {reel.reels[currentReel]?.user?.username}
            </Text>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <IconButton
                onClick={toggleLike}
                icon={isLiked ? <BsHeartFill className="text-red-500" /> : <BsHeart />}
                variant="ghost"
                colorScheme="whiteAlpha"
                aria-label="Like"
              />
              <IconButton
                icon={<BsChat />}
                variant="ghost"
                colorScheme="whiteAlpha"
                aria-label="Comment"
              />
              <IconButton
                icon={<BsShare />}
                variant="ghost"
                colorScheme="whiteAlpha"
                aria-label="Share"
              />
            </div>
            <IconButton
              onClick={toggleMute}
              icon={isMuted ? <BsVolumeMute /> : <BsVolumeUp />}
              variant="ghost"
              colorScheme="whiteAlpha"
              aria-label="Toggle mute"
            />
          </div>

          {/* Caption */}
          {reel.reels[currentReel]?.caption && (
            <Text className="text-white mt-2 text-sm">
              {reel.reels[currentReel]?.caption}
            </Text>
          )}
        </div>
      </motion.div>
    </div>
  );
};

ReelViewer.propTypes = {
  reels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ReelViewer;
